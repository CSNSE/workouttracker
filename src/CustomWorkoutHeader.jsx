import * as React from "react";
import { Button, Text, View } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./ui-components/utils.js";
import { getSession } from "./graphql/queries";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/api";

export default function CustomViewWorkoutsHeader(props) {
  const {overrides, ...rest } = props;
  const location = useLocation();
  const navigate = useNavigate(); 
  const [cid, setCid] = useState('');
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const splitPath = location.pathname.split('/DispWorkouts/');
    if (splitPath.length > 1) {
      setCid(splitPath[1]);
    }
  }, [location]);

  useEffect(() => {
    if (cid) {
      const fetchData = async () => {
        const client = generateClient();
        try {
          const response = await client.graphql({
            query: getSession.replaceAll("__typename", ""),
            variables: { id: cid },
          });
          setSessionData(response.data.getSession);
        } catch (err) {
          setError(err);
        }
      };
      fetchData();
    }
  }, [cid]);

  const handleBackButtonClick = () => {
    navigate("/Display");
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!sessionData) {
    return <div>Loading...</div>;
  }


  return (
    <View
      width="140px"
      height="43px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "ViewWorkoutsHeader")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="6px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="9px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="130px"
        height="11px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="17px"
        left="7px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={sessionData?.Type}
        {...getOverrideProps(overrides, "Session Type")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="6px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="9px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="130px"
        height="11px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="28px"
        left="7px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={sessionData?.Date}
        {...getOverrideProps(overrides, "Session Date")}
      ></Text>
      <Button
        width="50px"
        height="17.5px"
        position="absolute"
        top="2px"
        left="6px"
        size="default"
        isDisabled={false}
        variation="default"
        children="<---"
        onClick={handleBackButtonClick}
        {...getOverrideProps(overrides, "Button")}
      ></Button>
    </View>
  );
}
