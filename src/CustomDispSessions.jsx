import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Text, View } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { deleteSession, deleteSessionPublish } from "./graphql/mutations";
import "./CustomDispSessions.css";
import { getSessionPublish, listSessionPublishes } from "./graphql/queries";

export default function CustomDispSessions({ session }) {
  const navigate = useNavigate();
  const client = generateClient();

  const handleViewClick = () => {
    console.log(`Navigating to view session with id: ${session?.id}`);
    navigate(`/DispWorkouts/${session?.id}`);
  };

  const handleDeleteClick = async () => {
    console.log(`Attempting to delete session with id: ${session?.id}`);
    try {
      const publishData = await client.graphql({
        query: listSessionPublishes.replaceAll("__typename", ""),
        variables: { input: { Publish: session?.id } },
      });

      console.log("Publish data fetched:", publishData);
      const responses = publishData.data.listSessionPublishes.items;
      const matchingResponse = responses.find(response => response.sessionPublishPublishId === session?.id);

      if (matchingResponse) {
        console.log("Deleting session publish with id:", matchingResponse.id);
        await client.graphql({
          query: deleteSessionPublish,
          variables: { input: { id: matchingResponse.id } },
        });
      }

      console.log("Deleting session with id:", session?.id);
      await client.graphql({
        query: deleteSession,
        variables: { input: { id: session?.id } },
      });

      navigate(0); // Refresh the page to show the updated list
    } catch (error) {
      console.error("Error deleting the session:", error);
      alert("Error deleting the session: " + error.message);
    }
  };

  const handlePublishClick = async () => {
    console.log(`Publishing session with id: ${session?.id}`);
    navigate(`/PublishSession/${session?.id}`);
  };

  return (
    <View className="DispSessions">
      <View className="sessionContainer">
        <Text className="sessionType">{session?.Type}</Text>
        <Text className="sessionDate">{session?.Date}</Text>
        <Button className="viewButton" onClick={handleViewClick}>View</Button>
        <Button className="deleteButton" onClick={handleDeleteClick}>Delete</Button>
        <Button className="updateButton">Update</Button> {/* You may need to add onClick handler for update */}
        <Button className="publishButton" onClick={handlePublishClick}>Publish to Feed</Button>
      </View>
    </View>
  );
}
