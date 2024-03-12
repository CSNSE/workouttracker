import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./ui-components/utils.js";
import { generateClient } from "aws-amplify/api";
import { listSessions } from "./graphql/queries";
import { createWorkout } from "./graphql/mutations";

const client = generateClient();

export default function CustomWorkoutCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    cid, // Ensure cid is destructured from props
    ...rest
  } = props;

  // Initialize state
  const [Lift, setLift] = React.useState("");
  const [Weight, setWeight] = React.useState("");
  const [Reps, setReps] = React.useState("");
  const [errors, setErrors] = React.useState({});

  // Resets form fields to initial state
  const resetStateValues = () => {
    setLift("");
    setWeight("");
    setReps("");
    setErrors({});
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the input for creating a workout, including the sessionID (cid)
    const input = {
      Lift,
      Weight,
      Reps,
      sessionID: cid, // Use cid here
    };

    try {
      await client.graphql({
        query: createWorkout,
        variables: { input },
      });

      if (onSuccess) {
        onSuccess(input);
      }
      if (clearOnSuccess) {
        resetStateValues();
      }
    } catch (err) {
      if (onError) {
        const messages = err.errors.map((e) => e.message).join("\n");
        onError(input, messages);
      }
    }
  };

  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={handleSubmit}
      {...getOverrideProps(props, "CustomWorkoutCreateForm")}
      {...rest}
    >
      <TextField
        label="Lift"
        isRequired={true}
        value={Lift}
        onChange={(e) => setLift(e.target.value)}
        errorMessage={errors.Lift?.errorMessage}
        hasError={errors.Lift?.hasError}
      />
      <TextField
        label="Weight"
        isRequired={true}
        value={Weight}
        onChange={(e) => setWeight(e.target.value)}
        errorMessage={errors.Weight?.errorMessage}
        hasError={errors.Weight?.hasError}
      />
      <TextField
        label="Reps"
        isRequired={true}
        value={Reps}
        onChange={(e) => setReps(e.target.value)}
        errorMessage={errors.Reps?.errorMessage}
        hasError={errors.Reps?.hasError}
      />
      <Flex
        justifyContent="space-between"
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
        />
        <Button
          children="Submit"
          type="submit"
          variation="primary"
          isDisabled={Object.values(errors).some((e) => e?.hasError)}
        />
      </Flex>
    </Grid>
  );
}
