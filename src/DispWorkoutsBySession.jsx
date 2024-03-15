// DispWorkoutsBySession.jsx
import * as React from "react";
import { Button, Text, View } from "@aws-amplify/ui-react";
import { deleteWorkout } from "./graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { useNavigate } from "react-router-dom";
import "./DispWorkoutsBySession.css"; // Importing the CSS file

const DispWorkoutsBySession = ({ workout }) => {
    const client = generateClient();
    const navigate = useNavigate();

    const deleteButton = async () => {
        await client.graphql({
          query: deleteWorkout.replaceAll("__typename", ""),
          variables: {
            input: {
              id: workout?.id,
            },
          },
        });
        navigate(0);
    };

    return (
        <View className="workoutContainer">
            <Text className="workoutItem">{workout?.Lift}</Text>
            <Text className="workoutItem">{`${workout?.Reps} reps`}</Text>
            <Text className="workoutItem">{`${workout?.Weight} lbs`}</Text>
            <Button onClick={deleteButton} className="workoutItem deleteButton">Delete Workout</Button>
        </View>
    );
};

export default DispWorkoutsBySession;
