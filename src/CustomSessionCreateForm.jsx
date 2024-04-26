import React, { useState } from "react";
import { Button, Grid, TextField } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { createSession } from "./graphql/mutations";
import "./CustomSessionCreateForm.css"; // Make sure this path is correct
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from "./firebase-config";

const client = generateClient();
const auth = getAuth(app);

export default function CustomSessionCreateForm({ onSuccess, onError }) {
  const [sessionData, setSessionData] = useState({ Type: "", Date: "" });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSessionData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const uid = auth.currentUser?.uid; // Check for nullish values

    try {
      const result = await client.graphql({
        query: createSession,
        variables: {
          input: { ...sessionData, FirebaseUID: uid },
        },
      });
      if (onSuccess) {
        onSuccess(result.data.createSession);
      }
      navigate('/Display'); // Ensure navigation is after the success callback
    } catch (error) {
      console.error("Error creating session:", error);
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <Grid as="form" rowGap="20px" padding="30px" onSubmit={handleSubmit} className="formContainer">
      <TextField label="Type of Workout" name="Type" value={sessionData.Type} onChange={handleChange} className="formField" />
      <TextField label="Date" type="date" name="Date" value={sessionData.Date} onChange={handleChange} className="formField" />
      <Button type="submit" variation="primary" className="submitButton">Submit</Button>
    </Grid>
  );
}
