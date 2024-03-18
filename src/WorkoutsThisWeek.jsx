import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { listSessions, workoutsBySessionID } from "./graphql/queries";
import './WorkoutsThisWeek.css';

const client = generateClient();

const WorkoutsSummaryBox = () => {
  const [sessionIDs, setSessionIDs] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const startOfWeek = () => {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(date.setDate(diff));
  };

  const endOfWeek = () => {
    const date = startOfWeek();
    date.setDate(date.getDate() + 6);
    return date;
  };

  useEffect(() => {
    setStartDate(startOfWeek());
    setEndDate(endOfWeek());
  }, []);

  useEffect(() => {
    const fetchSessionIDs = async () => {
      try {
        const { data } = await client.graphql({
          query: listSessions,
          variables: {
            filter: {
              Date: {
                between: [startDate.toISOString(), endDate.toISOString()],
              },
            },
          },
        });
        const ids = data.listSessions.items.map(session => session.id);
        setSessionIDs(ids);
      } catch (error) {
        console.error("Error fetching session IDs:", error);
        setSessionIDs([]);
      }
    };

    fetchSessionIDs();
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const promises = sessionIDs.map(async id => {
          const { data } = await client.graphql({
            query: workoutsBySessionID,
            variables: {
              sessionID: id
            }
          });
          return data.workoutsBySessionID.items;
        });
        const results = await Promise.all(promises);
        const allWorkouts = results.flat();
        setWorkouts(allWorkouts);
      } catch (error) {
        console.error("Error fetching workouts:", error);
        setWorkouts([]);
      }
    };

    fetchWorkouts();
  }, [sessionIDs]);



  const calculateTotalVolume = () => {
    let totalVolume = 0;

    workouts.forEach((workout) => {
      if (workout.Weight && workout.Reps) {
        totalVolume += parseFloat(workout.Weight) * parseInt(workout.Reps);
      }
    });

    return totalVolume;
  };

  const totalVolume = calculateTotalVolume();

  return (
    <View className="workoutsSummaryBox">
      <Text className="workoutsSummaryBox__title">This Week's Summary</Text>
      <Text className="workoutsSummaryBox__item">Total Sessions: <span className="workoutsSummaryBox__item--highlight">{sessionIDs.length}</span></Text>
      <Text className="workoutsSummaryBox__item">Total Sets: <span className="workoutsSummaryBox__item--highlight">{workouts.length}</span></Text>
      <Text className="workoutsSummaryBox__item">Total Volume: <span className="workoutsSummaryBox__item--highlight">{totalVolume} lbs</span></Text>
    </View> 
  );
};

export default WorkoutsSummaryBox;
