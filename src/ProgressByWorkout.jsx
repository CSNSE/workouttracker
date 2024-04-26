import React, { useState, useEffect, useRef } from "react";
import { TextField } from "@aws-amplify/ui-react";
import { generateClient } from 'aws-amplify/api';
import { listSessions, workoutsBySessionID } from './graphql/queries';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebase-config';

const client = generateClient();

const ProgressByWorkout = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [workouts, setWorkouts] = useState({}); // Object to store workouts keyed by Lift name
    const [selectedWorkouts, setSelectedWorkouts] = useState([]); // Array to hold selected workouts details
    const [isInputFocused, setInputFocused] = useState(false);
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
                setInputFocused(false); // Close suggestions if click outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFocus = () => {
        setInputFocused(true); // Show suggestions when input is focused
    };

    const handleSelectSuggestion = (liftName) => {
        setSearchTerm(liftName); // Set search term to the lift name
        setInputFocused(false); // Hide suggestions after selection
        setSelectedWorkouts(workouts[liftName] || []); // Store all workouts with the selected lift name
    };

    return (
        <div>
            <div className="autocomplete-field" ref={inputRef}>
                <TextField
                    label="Lift"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={handleFocus}
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
            {selectedWorkouts.length > 0 && selectedWorkouts.map((workout, index) => (
                <div key={index} className="selected-workout-info">
                    <h3>Workout Details:</h3>
                    <p><strong>Lift:</strong> {workout.Lift}</p>
                    <p><strong>ID:</strong> {workout.id}</p>
                    <p><strong>Weight:</strong> {workout.Weight}</p>
                    {/* Include other details as needed */}
                </div>
            ))}
        </div>
    );
};

export default ProgressByWorkout;
