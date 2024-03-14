/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Divider, Text, View } from "@aws-amplify/ui-react";
export default function DisplayWorkouts(props) {
  const { workout, overrides, ...rest } = props;
  return (
    <View
      width="316px"
      height="80px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "DisplayWorkouts")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="24px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="135px"
        height="22px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="32px"
        left="6px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={workout?.Lift}
        {...getOverrideProps(overrides, "Exercise")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="24px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="49px"
        height="22px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="32px"
        left="158px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={workout?.Reps}
        {...getOverrideProps(overrides, "Reps")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="24px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="78px"
        height="22px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="32px"
        left="238px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={workout?.Weight}
        {...getOverrideProps(overrides, "Weight")}
      ></Text>

    </View>
  );
}
