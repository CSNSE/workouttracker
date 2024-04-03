import React, { useEffect, useState } from "react";
import { Text, View } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { listSessions, workoutsBySessionID } from "./graphql/queries";
import './WorkoutsThisWeek.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const client = generateClient();

const WorkoutsSummaryBox = () => {
    const [sessionIDs, setSessionIDs] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchSessionIDs(user.uid);
            } else {
                setLoading(false); // Stop loading if no user is logged in
            }
        });
    }, [auth]);

    const fetchSessionIDs = async (userId) => {
        const startDate = startOfWeek();
        const endDate = endOfWeek();

        try {
            const { data } = await client.graphql({
                query: listSessions,
                variables: {
                    filter: {
                        Date: {
                            between: [startDate.toISOString(), endDate.toISOString()],
                        },
                        FirebaseUID: userId,
                    },
                },
            });
            const ids = data.listSessions.items.map((session) => session.id);
            setSessionIDs(ids);
            if (ids.length > 0) {
                fetchWorkouts(ids);
            } else {
                setLoading(false); // Stop loading if there are no sessions
            }
        } catch (error) {
            console.error("Error fetching session IDs:", error);
            setLoading(false);
        }
    };

    const fetchWorkouts = async (sessionIds) => {
        try {
            const promises = sessionIds.map((id) =>
                client.graphql({
                    query: workoutsBySessionID,
                    variables: { sessionID: id },
                })
            );
            const results = await Promise.all(promises);
            const allWorkouts = results.flatMap((result) => result.data.workoutsBySessionID.items);
            setWorkouts(allWorkouts);
        } catch (error) {
            console.error("Error fetching workouts:", error);
        }
        setLoading(false);
    };

    const startOfWeek = () => {
        const date = new Date();
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };

    const endOfWeek = () => {
        const date = new Date(startOfWeek());
        date.setDate(date.getDate() + 6);
        return date;
    };


    const calculateTotalVolume = () => {
      let totalVolume = 0;
  
      workouts.forEach((workout) => {
        if (workout.Weight && workout.Reps) {
          totalVolume += parseFloat(workout.Weight) * parseInt(workout.Reps);
        }
      });
  
      return totalVolume;
    };

    return (
        <View className="workoutsSummaryBox">
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <Text className="workoutsSummaryBox__title">This Week's Summary</Text>
                    <Text className="workoutsSummaryBox__item">Total Sessions: <span className="workoutsSummaryBox__item--highlight">{sessionIDs.length}</span></Text>
                    <Text className="workoutsSummaryBox__item">Total Sets: <span className="workoutsSummaryBox__item--highlight">{workouts.length}</span></Text>
                    <Text className="workoutsSummaryBox__item">Total Volume: <span className="workoutsSummaryBox__item--highlight">{calculateTotalVolume(workouts)} lbs</span></Text>
                </>
            )}
        </View>
    );
};

export default WorkoutsSummaryBox;
