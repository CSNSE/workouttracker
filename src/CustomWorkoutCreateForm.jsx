import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { createWorkout } from "./graphql/mutations";
import './CustomWorkoutCreateForm.css';
import debounce from 'lodash.debounce';

export default function CustomWorkoutCreateForm({ clearOnSuccess = true, onSuccess, onError, cid, ...rest }) {
  const [Lift, setLift] = useState("");
  const [Weight, setWeight] = useState("");
  const [Reps, setReps] = useState("");
  const [errors, setErrors] = useState({});
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const client = generateClient();
  const autocompleteRef = useRef(null);

  const debouncedFetchSuggestions = useCallback(debounce(async (searchText) => {
    if (!searchText.trim()) {
      setAutocompleteSuggestions([]);
      return;
    }
    const apiKey = '2y3uQcLfSFpPpp3SxnPsUQ==B03JjsQado5rWczt'; // Move this to a secure location
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
  }, 300), []);

  useEffect(() => {
    debouncedFetchSuggestions(searchTerm);
  }, [searchTerm, debouncedFetchSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setAutocompleteSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion); // Set the search term to the selected suggestion
    setLift(suggestion);
    setAutocompleteSuggestions([]); // Clear suggestions after selection
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = { Lift, Weight, Reps, sessionID: cid };

    try {
      await client.graphql({ query: createWorkout, variables: { input } });
      if (onSuccess) onSuccess(input);
      if (clearOnSuccess) resetStateValues();
    } catch (err) {
      if (onError) onError(input, err.errors.map(e => e.message).join("\n"));
    }
  };

  const resetStateValues = () => {
    setLift("");       
    setWeight("");    
    setReps("");
    setErrors({});    
    setSearchTerm("");
  };

  return (
    <Grid
      as="form"
      templateColumns="repeat(1, 1fr)"
      gap="20px"
      onSubmit={handleSubmit}
      className="form-container"
      {...rest}
    >
      <div className="autocomplete-field" ref={autocompleteRef}>
        <TextField
          label="Lift"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setLift(e.target.value);
          }}
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
      
      <TextField
        label="Weight"
        isRequired
        value={Weight}
        onChange={(e) => setWeight(e.target.value)}
        errorMessage={errors.Weight?.errorMessage}
        hasError={!!errors.Weight}
        className="form-field weight"
      />
      
      <TextField
        label="Reps"
        isRequired
        value={Reps}
        onChange={(e) => setReps(e.target.value)}
        errorMessage={errors.Reps?.errorMessage}
        hasError={!!errors.Reps}
        className="form-field reps"
      />
  
      <Flex
        direction="row"
        justifyContent="space-between"
        gap="20px"
        className="buttons-container"
      >
        <Button
          onClick={resetStateValues}
          type="reset"
          className="clear-button"
        >
          Clear
        </Button>
        
        <Button
          variation="primary"
          type="submit"
          disabled={Object.values(errors).some((e) => e.hasError)}
          className="submit-button"
        >
          Submit
        </Button>
      </Flex>
    </Grid>
  );
}
