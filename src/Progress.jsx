import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import { generateClient } from 'aws-amplify/api';
import { listSessions, workoutsBySessionID } from './graphql/queries';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Progress.css';


const client = generateClient();

const Progress = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Volume',
                data: [],
                backgroundColor: 'rgba(75, 192, 235, 0.5)',
                borderColor: 'rgba(75, 192, 235, 1)',
                borderWidth: 1,
            },
        ],
    });
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
    
            let sessions = data.listSessions.items;
            sessions.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    
            const labels = sessions.map(session => new Date(session.Date + 'T12:00:00').toLocaleDateString());
    
            const workoutPromises = sessions.map(session =>
                client.graphql({
                    query: workoutsBySessionID,
                    variables: { sessionID: session.id },
                })
            );
    
            const workoutResponses = await Promise.all(workoutPromises);
            const workouts = workoutResponses.flatMap(response => response.data.workoutsBySessionID.items);
    
            const volumeData = sessions.map(session => {
                const sessionWorkouts = workouts.filter(workout => workout.sessionID === session.id);
                return sessionWorkouts.reduce((acc, workout) => acc + (workout.Weight * workout.Reps), 0);
            });
    
            setChartData({
                labels,
                datasets: [{ 
                    ...chartData.datasets[0], 
                    data: volumeData.map(v => v.totalVolume || v) // Ensure we extract just the volume number
                }],
            });
        } catch (error) {
            console.error('Error fetching sessions and workouts:', error);
        }
        setLoading(false);
    };
    

    return (
        <div className="progress-container">
            <h2 className="progress-header">Workout Volume Progress</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="bar-chart-container">
                    <BarChart data={chartData} />
                </div>
            )}
        </div>
    );
};

export default Progress;
