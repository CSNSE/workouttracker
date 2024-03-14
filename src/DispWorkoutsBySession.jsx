import * as React from "react";
import { Button, Text, View } from "@aws-amplify/ui-react";
import { deleteWorkout } from "./graphql/mutations";
import {generateClient } from "aws-amplify/api";
import { useNavigate } from "react-router-dom";

const DispWorkoutsBySession = ({ workout }) => {
    const client = generateClient();
    const navigate = useNavigate();
    // State to trigger re-render
    const [, setRefresh] = React.useState(false);

    const deleteButton = async () => {
        await client.graphql({
          query: deleteWorkout.replaceAll("__typename", ""),
          variables: {
            input: {
              id: workout?.id,
            },
          },
        });
        // Trigger a re-render by changing the state
        setRefresh(prev => !prev);
        // Optionally, navigate to the current page to force reload
        navigate(0);
    };

    return (
        <View width="316px" height="80px" display="block" gap="unset" alignItems="unset" justifyContent="unset" overflow="hidden" position="relative" padding="0px 0px 0px 0px" backgroundColor="rgba(255,255,255,1)">
            <Text fontFamily="Inter" fontSize="16px" fontWeight="400" color="rgba(0,0,0,1)" lineHeight="24px" textAlign="left" display="block" direction="column" justifyContent="unset" width="135px" height="22px" gap="unset" alignItems="unset" position="absolute" top="32px" left="6px" padding="0px 0px 0px 0px" whiteSpace="pre-wrap" children={workout?.Lift}></Text>
            <Text fontFamily="Inter" fontSize="16px" fontWeight="400" color="rgba(0,0,0,1)" lineHeight="24px" textAlign="left" display="block" direction="column" justifyContent="unset" width="49px" height="22px" gap="unset" alignItems="unset" position="absolute" top="32px" left="158px" padding="0px 0px 0px 0px" whiteSpace="pre-wrap" children={workout?.Reps}></Text>
            <Text fontFamily="Inter" fontSize="16px" fontWeight="400" color="rgba(0,0,0,1)" lineHeight="24px" textAlign="left" display="block" direction="column" justifyContent="unset" width="78px" height="22px" gap="unset" alignItems="unset" position="absolute" top="32px" left="238px" padding="0px 0px 0px 0px" whiteSpace="pre-wrap" children={workout?.Weight}></Text>
            <Button onClick={deleteButton}>Delete Workout</Button>
        </View>
    );
};

export default DispWorkoutsBySession;
