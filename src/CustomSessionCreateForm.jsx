import React, { useState } from "react";
import { Button, Grid, TextField } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { createSession } from "./graphql/mutations";
import "./CustomSessionCreateForm.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

const client = generateClient();

export default function CustomSessionCreateForm(props) {
  const { onSuccess, onError, ...rest } = props;

  const initialValues = {
    Type: "",
    Date: "",
  };

  const [Type, setType] = useState(initialValues.Type);
  const [Date, setDate] = useState(initialValues.Date);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const sessionData = {
      Type,
      Date,
    };

    try {
      await client.graphql({
        query: createSession,
        variables: {
          input: sessionData,
        },
      });
      navigate('/Display')
      if (onSuccess) {
        onSuccess(sessionData);
      }
    } catch (error) {
      console.error("Error creating session:", error);
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <Grid
      as="form"
      rowGap="20px"
      padding="30px"
      onSubmit={handleSubmit}
      className="formContainer"
      {...rest}
    >
      <TextField
        label="Type of Workout"
        value={Type}
        onChange={(e) => setType(e.target.value)}
        className="formField"
      />
      <TextField
        label="Date"
        type="date"
        value={Date}
        onChange={(e) => setDate(e.target.value)}
        className="formField"
      />
      <Button
        type="submit"
        variation="primary"
        className="submitButton"
      >
        Submit
      </Button>
    </Grid>
  );
}
