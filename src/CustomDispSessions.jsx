import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Text, View } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { deleteSession } from "./graphql/mutations";
import "./CustomDispSessions.css"; // Assuming CSS file is in the same directory

export default function CustomDispSessions({ session }) {
  const navigate = useNavigate();
  const client = generateClient();

  const handleAddClick = () => navigate(`/AddWorkout/${session?.id}`);
  const handleViewClick = () => navigate(`/DispWorkouts/${session?.id}`);
  const handleDeleteClick = async () => {
    await client.graphql({
      query: deleteSession.replaceAll("__typename", ""),
      variables: { input: { id: session?.id } },
    });
    navigate(0); 
  };

  return (
    <View className="DispSessions">
      <View className="sessionContainer">
        <Text className="sessionType">{session?.Type}</Text>
        <Text className="sessionDate">{session?.Date}</Text>
        <Button className="addButton" onClick={handleAddClick}>Add</Button>
        <Button className="viewButton" onClick={handleViewClick}>View</Button>
        <Button className="deleteButton" onClick={handleDeleteClick}>Delete</Button>
        <Button className="updateButton">Update</Button> {/* Add onClick behavior for update if necessary */}
      </View>
    </View>
  );
}
