import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { createWorkout } from "./graphql/mutations";
import './CustomWorkoutCreateForm.css';
import $ from 'jquery';

export default function CustomWorkoutCreateForm({ clearOnSuccess = true, onSuccess, onError, cid, ...rest }) {
  const [Lift, setLift] = React.useState("");
  const [Weight, setWeight] = React.useState("");
  const [Reps, setReps] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const client = generateClient();
  var name = '';
  const workouts = [];
  $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/exercises?name='+name,
      headers: { 'X-Api-Key': '2y3uQcLfSFpPpp3SxnPsUQ==B03JjsQado5rWczt'},  
      contentType: 'application/json',
      success: function(result) {
        result.forEach(function(exercise){
          workouts.push(exercise.name); 
        });
        console.log(workouts[1])
      },
      error: function ajaxError(jqXHR) {
          console.error('Error: ', jqXHR.responseText);
      }
  });
  

  const resetStateValues = () => {
    setLift("");
    setWeight("");
    setReps("");
    setErrors({});
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

  return (
    <Grid
      as="form"
      templateColumns="repeat(1, 1fr)"
      gap="20px"
      onSubmit={handleSubmit}
      className="form-container"
      {...rest}
    >
      <TextField
        label="Lift"
        isRequired
        value={Lift}
        onChange={(e) => setLift(e.target.value)}
        errorMessage={errors.Lift?.errorMessage}
        hasError={!!errors.Lift}
        className="form-field lift"
      />
      
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
        label= {workouts[0]}
        isRequired
        value={Reps}
        onChange={(e) => setReps(e.target.value)}
        errorMessage={errors.Reps?.errorMessage}
        hasError={!!errors.Reps}
        className="form-field reps"
      />
    <select className="WorkoutSelector">
      {workouts.map((workouts, index) => (
        <option key={index} value={workouts}>
          {workouts}
        </option>
      ))}
    </select>

      
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
