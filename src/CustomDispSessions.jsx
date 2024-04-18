import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Text, View } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { deleteSession, deleteSessionPublish } from "./graphql/mutations";
import "./CustomDispSessions.css"; // Assuming CSS file is in the same directory
import { getSessionPublish, listSessionPublishes } from "./graphql/queries";
export default function CustomDispSessions({ session }) {
  const navigate = useNavigate();
  const client = generateClient();

  const handleViewClick = () => navigate(`/DispWorkouts/${session?.id}`);
  // const handleDeleteClick = async () => {
  //   await client.graphql({
  //     query: deleteSession.replaceAll("__typename", ""),
  //     variables: { input: { id: session?.id } },
  //   });
  //   navigate(0); // Refresh the page to show the updated list
  // };

  const handleDeleteClick = async () => {
    try {
    await client.graphql({
      query: listSessionPublishes.replaceAll("__typename", ""),
      variables: { input: { Publish: session?.id } },
    }).then((response) => {
      const responses = response.data.listSessionPublishes.items;
      const matchingResponse = responses.find(response => response.sessionPublishPublishId === session?.id);
      if (matchingResponse) {
        client.graphql({
          query: deleteSessionPublish,
          variables: { input: { id: matchingResponse.id } },
        });
        client.graphql({
          query: deleteSession,
          variables: { input: { id: session?.id } },
        });
      } else {
        client.graphql({
          query: deleteSession,
          variables: { input: { id: session?.id } },
        });
      
      }


    
    })
    navigate(0); // Refresh the page to show the updated list
  } catch (error) {
    alert.error("Error deleting the session: ", error);
  }
  }

  const handlePublishClick = async() => {
    const cid = session?.id;
    navigate(`/PublishSession/${cid}`);
  }

  return (
    <View className="DispSessions">
      <View className="sessionContainer">
        <Text className="sessionType">{session?.Type}</Text>
        <Text className="sessionDate">{session?.Date}</Text>
        <Button className="viewButton" onClick={handleViewClick}>View</Button>
        <Button className="deleteButton" onClick={handleDeleteClick}>Delete</Button>
        <Button className="updateButton">Update</Button> 
        <Button className="publishButton" onClick={handlePublishClick}>Publish to Feed</Button>
      </View>
    </View>
  );
}