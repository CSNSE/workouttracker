import React, { useState, useEffect, useRef } from "react";
import { TextField } from "@aws-amplify/ui-react";
import { generateClient } from 'aws-amplify/api';
import { listSessions, workoutsBySessionID } from './graphql/queries';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebase-config';

const client = generateClient();

const ProgressByWorkout = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
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
                    const workouts = await Promise.all(
                        sessionIds.map(id =>
                            client.graphql({
                                query: workoutsBySessionID,
                                variables: { sessionID: id }
                            })
                        )
                    );
                    const workoutTitles = workouts.flatMap(res => res.data.workoutsBySessionID.items.map(item => item.Lift));
                    const uniqueTitles = Array.from(new Set(workoutTitles)); // Remove duplicates
                    setAutocompleteSuggestions(uniqueTitles);
                } catch ( error) {
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

    const handleSelectSuggestion = (suggestion) => {
        setSearchTerm(suggestion); // Select the suggestion
        setInputFocused(false); // Hide suggestions after selection
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
                {isInputFocused && autocompleteSuggestions.length > 0 && (
                    <ul className="autocomplete-suggestions">
                        {autocompleteSuggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSelectSuggestion(suggestion)} className="suggestion-item">
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProgressByWorkout;
