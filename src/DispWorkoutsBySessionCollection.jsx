import * as React from "react";
import { View, Collection, Placeholder } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import { workoutsBySessionID } from "./graphql/queries";
import DispWorkoutsBySession from "./DispWorkoutsBySession"; 

export default function DispWorkoutsBySessionCollection(props) {
    const [workoutData, setWorkoutData] = useState({ items: [] }); 
    const [error, setError] = useState(null);
    const location = useLocation();
    const [cid, setCid] = useState('');

    useEffect(() => {
        const splitPath = location.pathname.split('/DispWorkouts/');
        if (splitPath.length > 1) {
            setCid(splitPath[1]);
        }
    }, [location]);

    useEffect(() => {
        if (cid) {
            const fetchData = async () => {
                const client = generateClient();
                try {
                    const response = await client.graphql({
                        query: workoutsBySessionID,
                        variables: { sessionID: cid },
                    });
                    setWorkoutData(response.data.workoutsBySessionID);
                } catch (err) {
                    setError(err.message);
                    setWorkoutData({ items: [] }); 
                }
            };
            fetchData();
        }
    }, [cid]);

    const { items: workouts } = workoutData; 

    return (
        <View>
            {error ? (
                <Placeholder size="large">{`Error: ${error}`}</Placeholder>
            ) : (
                workouts.map((workout, index) => (
                    <DispWorkoutsBySession workout={workout} key={workout.id || index} />
                ))
            )}
        </View>
    );
}
