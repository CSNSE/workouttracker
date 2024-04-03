import React, { useEffect, useState } from "react";
import { Text, View } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { listSessions, workoutsBySessionID } from "./graphql/queries";
import './WorkoutsThisWeek.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const client = generateClient();

const WorkoutsSummaryBox = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchSessionsAndWorkouts(user.uid);
            } else {
                setLoading(false);
            }
        });
    }, [auth]);

    const fetchSessionsAndWorkouts = async (userId) => {
        setLoading(true);
        try {
            const sessionResponse = await client.graphql({
                query: listSessions,
                variables: {
                    filter: {
                        FirebaseUID: userId,
                    },
                },
            });

            const sessions = sessionResponse.data.listSessions.items;
            const workoutPromises = sessions.map(session =>
                client.graphql({
                    query: workoutsBySessionID,
                    variables: { sessionID: session.id },
                })
            );

            const workoutResponses = await Promise.all(workoutPromises);
            const allWorkouts = workoutResponses.flatMap(response => response.data.workoutsBySessionID.items);
            
            setWorkouts(allWorkouts);
        } catch (error) {
            console.error("Error fetching sessions and workouts:", error);
        }
        setLoading(false);
    };

    const calculateTotalVolume = () => {
        return workouts.reduce((total, workout) => total + (workout.Weight * workout.Reps), 0);
    };

    return (
        <View className="workoutsSummaryBox">
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <Text className="workoutsSummaryBox__title">This Week's Summary</Text>
                    <Text className="workoutsSummaryBox__item">Total Sessions: <span className="workoutsSummaryBox__item--highlight">{workouts.length}</span></Text>
                    <Text className="workoutsSummaryBox__item">Total Volume: <span className="workoutsSummaryBox__item--highlight">{calculateTotalVolume()} lbs</span></Text>
                </>
            )}
        </View>
    );
};

export default WorkoutsSummaryBox;
