import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Text, View } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { deleteSession, deleteSessionPublish } from "./graphql/mutations";
import "./CustomDispSessions.css";
import { useState, useEffect } from "react";
import { getSessionPublish, listSessionPublishes } from "./graphql/queries";

export default function CustomDispSessions({ session }) {
  const navigate = useNavigate();
  const [published, setPublished] = useState(false);
  const client = generateClient();
  const [publishDisabled, setPublishDisabled] = useState(false);

  
  useEffect(() => {
    checkPublishes(session?.id);
  }, [session?.id]);

  const handleViewClick = () => {
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
 
 
  const handlePublishClick = () => {
    if (!publishDisabled) {
      navigate(`/PublishSession/${session?.id}`);
    }
  };

  const checkPublishes = async (id) => {
    try {
      const response = await client.graphql({
        query: listSessionPublishes,
        variables: { input: { Publish: id } },
      });
      const publishItems = response.data.listSessionPublishes.items;
      const isPublished = publishItems.some(item => item.sessionPublishPublishId === id);
      setPublishDisabled(isPublished);
    } catch (error) {
      console.error("Error checking publish status:", error);
    }
  };



  return (
    <View className="DispSessions">
      <View className="sessionContainer">
        <Text className="sessionType">{session?.Type}</Text>
        <Text className="sessionDate">{session?.Date}</Text>
        <Button className="viewButton" onClick={handleViewClick}>View</Button>
        <Button className="deleteButton" onClick={handleDeleteClick}>Delete</Button>
        <Button className="updateButton">Update</Button> 
        <Button className="publishButton" onClick={handlePublishClick} disabled={publishDisabled}> Publish to Feed </Button>
      </View>
    </View>
  );
}

