import React, { useState, useEffect, useRef } from "react";
import { TextField } from "@aws-amplify/ui-react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { generateClient } from 'aws-amplify/api';
import { listSessions, workoutsBySessionID } from './graphql/queries';
import { getAuth } from 'firebase/auth';
import app from './firebase-config';
import './ProgressByWorkout.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const client = generateClient();
const ProgressByWorkout = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [workouts, setWorkouts] = useState({});
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const [isInputFocused, setInputFocused] = useState(false);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Total Volume per Set',
            data: [],
            backgroundColor: '#ffff',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }]
    });
    const inputRef = useRef(null);
    const auth = getAuth(app);

    useEffect(() => {
        const fetchSessionsAndWorkouts = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const { data: sessionData } = await client.graphql({
                        query: listSessions,
                        variables: { filter: { FirebaseUID: { eq: user.uid } } },
                    });
                    const sessionIds = sessionData.listSessions.items.map(item => item.id);
                    const workoutsData = await Promise.all(
                        sessionIds.map(id =>
                            client.graphql({
                                query: workoutsBySessionID,
                                variables: { sessionID: id }
                            })
                        )
                    );
                    const fetchedWorkouts = workoutsData.flatMap(res => res.data.workoutsBySessionID.items);
                    const workoutMap = {};
                    fetchedWorkouts.forEach(workout => {
                        workoutMap[workout.Lift] = workoutMap[workout.Lift] || [];
                        workoutMap[workout.Lift].push(workout);
                    });
                    setWorkouts(workoutMap);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchSessionsAndWorkouts();
    }, [auth]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setInputFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelectSuggestion = (liftName) => {
        setSearchTerm(liftName);
        setInputFocused(false);
        const selectedLiftWorkouts = workouts[liftName] || [];

        setSelectedWorkouts(selectedLiftWorkouts);
        
        const labels = selectedLiftWorkouts.map((_, index) => `Set ${index + 1}`);
        const data = selectedLiftWorkouts.map(workout => workout.Weight * workout.Reps);
        data.reverse();

        setChartData({
            labels,
            datasets: [{
                label: liftName +' Volume per set',
                data,
                backgroundColor: '#ffff',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1,
            }]
        });
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white'  // Change this to your desired color for Y-axis labels
                },
                title: {
                    display: true,
                    text: 'Total Volume',
                    color: 'white'  // Change this to your desired color for Y-axis title
                }
            },
            x: {
                ticks: {
                    color: 'white'  // Change this to your desired color for X-axis labels
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white'  // Change this to your desired color for legend labels
                }
            }
        }
    };

    return (
        <div>
            <div className="autocomplete-field" ref={inputRef}>
                <TextField
                    label="Lift"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    autoComplete="off"
                    className="form-field search"
                />
                {isInputFocused && (
                    <ul className="autocomplete-suggestions">
                        {Object.keys(workouts).map((liftName, index) => (
                            <li key={index} onClick={() => handleSelectSuggestion(liftName)} className="suggestion-item">
                                {liftName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {selectedWorkouts.length > 0 && (
                <div className="chart-container">
                    <Bar data={chartData} options={options} />
                </div>
            )}
        </div>
    );
};

export default ProgressByWorkout;

