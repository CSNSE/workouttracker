import React, { useEffect, useState } from "react";
import { Text, View } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { listSessions, workoutsBySessionID } from "./graphql/queries";
import './WorkoutsThisWeek.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const client = generateClient();

const WorkoutsSummaryBox = () => {
    const [workouts, setWorkouts] = useState([]);
    const [totalVolume, setTotalVolume] = useState(0);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User is logged in, fetching data...');
                fetchSessionsAndWorkouts(user.uid);
            } else {
                console.log('No user is logged in.');
                setLoading(false);
            }
        });
    }, [auth]);

    const fetchSessionsAndWorkouts = async (userId) => {
      setLoading(true);
      try {
          const { data } = await client.graphql({
              query: listSessions,
              variables: { filter: { FirebaseUID: { eq: userId } } },
          });
  
          const sessions = data.listSessions.items;
          sessions.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    
          const workoutPromises = sessions.map(session =>
              client.graphql({
                  query: workoutsBySessionID,
                  variables: { sessionID: session.id },
              })
          );
  
          const workoutResponses = await Promise.all(workoutPromises);
          const allWorkouts = workoutResponses.flatMap(response => response.data.workoutsBySessionID.items);
          setWorkouts(allWorkouts);

          const volumeData = allWorkouts.reduce((acc, workout) => acc + (workout.Weight * workout.Reps), 0);
          setTotalVolume(volumeData);
  
      } catch (error) {
          console.error('Error fetching sessions and workouts:', error);
      }
      setLoading(false);
  };

    return (
        <View className="workoutsSummaryBox">
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <Text className="workoutsSummaryBox__title">This Week's Summary</Text>
                    <Text className="workoutsSummaryBox__item">Total Workouts: <span className="workoutsSummaryBox__item--highlight">{workouts.length}</span></Text>
                    <Text className="workoutsSummaryBox__item">Total Volume: <span className="workoutsSummaryBox__item--highlight">{totalVolume} lbs</span></Text>
                </>
            )}
        </View>
    );
};

export default WorkoutsSummaryBox;
