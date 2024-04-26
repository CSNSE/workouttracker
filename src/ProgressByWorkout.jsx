import React, { useState, useEffect, useCallback, useRef } from "react";
import BarChart from './BarChart';
import { TextField } from "@aws-amplify/ui-react";
import { generateClient } from 'aws-amplify/api';
import { listSessions, workoutsBySessionID } from './graphql/queries';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebase-config';
import debounce from 'lodash.debounce';

const client = generateClient();

const ProgressByWorkout = () => {
    const apiKey = '2y3uQcLfSFpPpp3SxnPsUQ==B03JjsQado5rWczt'; // Reminder to move this to a secure location
    const [searchTerm, setSearchTerm] = useState('');
    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

    const inputRef = useRef(null); // Reference to the input field

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Volume by Workout',
                data: [],
                backgroundColor: 'rgba(75, 192, 235, 0.5)',
                borderColor: 'rgba(75, 192, 235, 1)',
                borderWidth: 1,
            },
        ],
    });
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User is logged in, fetching data...');
            } else {
                console.log('No user is logged in.');
                setLoading(false);
            }
        });
    }, [auth]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setAutocompleteSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [inputRef]);

    const fetchSuggestions = useCallback(async (searchText) => {
        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/exercises?name=${encodeURIComponent(searchText)}`, {
                method: 'GET',
                headers: {
                    'X-Api-Key': apiKey,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }
            const result = await response.json();
            setAutocompleteSuggestions(result.map(exercise => exercise.name));
        } catch (error) {
            console.error('Failed to fetch workouts', error);
        }
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const debouncedFetch = debounce(fetchSuggestions, 300);
            debouncedFetch(searchTerm);
        } else {
            setAutocompleteSuggestions([]);
        }
    }, [searchTerm, fetchSuggestions]);

    const handleSelectSuggestion = (suggestion) => {
        setSearchTerm(suggestion); // Set the search term to the selected suggestion
        setAutocompleteSuggestions([]); // Clear suggestions after selection
    };

    return (
        <div>
            <div className="autocomplete-field" ref={inputRef}>
                <TextField
                    label="Lift"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off"
                    className="form-field search"
                />
                {autocompleteSuggestions.length > 0 && (
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
}

export default ProgressByWorkout;
