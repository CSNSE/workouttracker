/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps, useNavigateAction } from "./utils";
import { generateClient } from "aws-amplify/api";
import { deleteSession } from "../graphql/mutations";
import { Button, Text, View } from "@aws-amplify/ui-react";
const client = generateClient();
export default function DispSessions(props) {
  const { session, overrides, ...rest } = props;
  const buttonThreeEightFiveFiveFourThreeThreeNineOnClick = useNavigateAction({
    type: "url",
    url: "/AddWorkout",
  });
  const buttonThreeEightFourSixFourThreeTwoZeroOnClick = async () => {
    await client.graphql({
      query: deleteSession.replaceAll("__typename", ""),
      variables: {
        input: {
          id: session?.id,
        },
      },
    });
  };
  const buttonThreeEightFourSixFourThreeTwoZeroOnMouseUp = useNavigateAction({
    type: "url",
    url: "/Display",
  });
  return (
    <View
      width="373px"
      height="84px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(40,44,52,1)"
      {...getOverrideProps(overrides, "DispSessions")}
      {...rest}
    >
      <View
        width="349px"
        height="61px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        position="absolute"
        top="11px"
        left="12px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(0,0,0,1)"
        {...getOverrideProps(overrides, "Frame 1")}
      >
        <Button
          width="unset"
          height="unset"
          position="absolute"
          top="258px"
          left="1544px"
          size="default"
          isDisabled={false}
          variation="default"
          children="Button"
          {...getOverrideProps(overrides, "Button38464310")}
        ></Button>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="700"
          color="rgba(255,255,255,1)"
          lineHeight="24px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="48px"
          height="19px"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="6px"
          left="15px"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children={session?.Type}
          {...getOverrideProps(overrides, "Type")}
        ></Text>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="700"
          color="rgba(255,255,255,1)"
          lineHeight="24px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="141px"
          height="19px"
          gap="unset"
          alignItems="unset"
          position="absolute"
          top="6px"
          left="80px"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children={session?.Date}
          {...getOverrideProps(overrides, "Date")}
        ></Text>
      </View>
      <Button
        width="38px"
        height="34px"
        position="absolute"
        top="25px"
        left="265px"
        size="default"
        isDisabled={false}
        variation="default"
        onClick={() => {
          buttonThreeEightFiveFiveFourThreeThreeNineOnClick();
        }}
        {...getOverrideProps(overrides, "Button38554339")}
      ></Button>
      <Button
        width="38px"
        height="34px"
        position="absolute"
        top="25px"
        left="315px"
        size="default"
        isDisabled={false}
        variation="default"
        onClick={() => {
          buttonThreeEightFourSixFourThreeTwoZeroOnClick();
        }}
        onMouseUp={() => {
          buttonThreeEightFourSixFourThreeTwoZeroOnMouseUp();
        }}
        {...getOverrideProps(overrides, "Button38464320")}
      ></Button>
    </View>
  );
}
