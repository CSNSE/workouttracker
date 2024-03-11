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
export default function DisplaySessionsNew(props) {
  const { session, overrides, ...rest } = props;
  const buttonThreeEightSevenTwoNineSevenFourEightOnClick = useNavigateAction({
    type: "url",
    url: "/AddWorkout",
  });
  const buttonThreeEightSevenTwoNineSevenFiveZeroOnClick = async () => {
    await client.graphql({
      query: deleteSession.replaceAll("__typename", ""),
      variables: {
        input: {
          id: session?.id,
        },
      },
    });
  };
  const buttonThreeEightSevenTwoNineSevenFiveZeroOnMouseUp = useNavigateAction({
    type: "reload",
  });
  return (
    <View
      width="392px"
      height="71px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(0,0,0,1)"
      {...getOverrideProps(overrides, "DisplaySessionsNew")}
      {...rest}
    >
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
        width="85px"
        height="24px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="8px"
        left="13px"
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
        width="123px"
        height="24px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="8px"
        left="108px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={session?.Date}
        {...getOverrideProps(overrides, "2020/10/10")}
      ></Text>
      <View
        width="1px"
        height="1px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        position="absolute"
        top="31px"
        left="277px"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 2")}
      ></View>
      <Button
        width="62px"
        height="20px"
        position="absolute"
        top="12px"
        left="250px"
        size="default"
        isDisabled={false}
        variation="default"
        children="Add"
        onClick={() => {
          buttonThreeEightSevenTwoNineSevenFourEightOnClick();
        }}
        {...getOverrideProps(overrides, "Button38729748")}
      ></Button>
      <Button
        width="62px"
        height="20px"
        position="absolute"
        top="35px"
        left="318px"
        size="default"
        isDisabled={false}
        variation="default"
        children="View"
        {...getOverrideProps(overrides, "Button38729749")}
      ></Button>
      <Button
        width="62px"
        height="20px"
        position="absolute"
        top="12px"
        left="318px"
        size="default"
        isDisabled={false}
        variation="default"
        children="Delete"
        onClick={() => {
          buttonThreeEightSevenTwoNineSevenFiveZeroOnClick();
        }}
        onMouseUp={() => {
          buttonThreeEightSevenTwoNineSevenFiveZeroOnMouseUp();
        }}
        {...getOverrideProps(overrides, "Button38729750")}
      ></Button>
      <Button
        width="62px"
        height="20px"
        position="absolute"
        top="35px"
        left="250px"
        size="default"
        isDisabled={false}
        variation="default"
        children="Update"
        {...getOverrideProps(overrides, "Button38729751")}
      ></Button>
      <View
        width="392px"
        height="9px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        position="absolute"
        top="71px"
        left="0px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(40,44,52,1)"
        {...getOverrideProps(overrides, "Frame 4")}
      ></View>
    </View>
  );
}
