import React, { useState } from "react";
import { Button, Grid, TextField } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { createSession } from "./graphql/mutations";
import "./CustomSessionCreateForm.css"; // Import CSS file
import { useNavigate } from "react-router-dom";
import app from "./firebase-config";
import { getAuth } from "firebase/auth";

const client = generateClient();
const auth = getAuth(app);

export default function CustomSessionCreateForm({ onSuccess, onError }) {
  const [sessionData, setSessionData] = useState({
    Type: "",
    Date: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSessionData({ ...sessionData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const uid = auth.currentUser.uid; // Ensure uid is fetched at the time of submission

    try {
      const result = await client.graphql({
        query: createSession,
        variables: {
          input: { ...sessionData, FirebaseUID: uid },
        },
      });
      navigate('/Display');
      if (onSuccess) {
        onSuccess(result.data.createSession);
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
    >
      <TextField
        label="Type of Workout"
        name="Type"
        value={sessionData.Type}
        onChange={handleChange}
        className="formField"
      />
      <TextField
        label="Date"
        type="date"
        name="Date"
        value={sessionData.Date}
        onChange={handleChange}
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
