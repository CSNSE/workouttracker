/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import { Button, Text, View } from "@aws-amplify/ui-react";
export default function ViewWorkoutsHeader(props) {
  const { session, overrides, ...rest } = props;
  return (
    <View
      width="316px"
      height="133px"
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
        fontSize="20px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="30px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="165px"
        height="24px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="30px"
        left="7px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={session?.Type}
        {...getOverrideProps(overrides, "Session Type")}
      ></Text>
      <Text
        fontFamily="Inter"
        fontSize="20px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
        lineHeight="30px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="165px"
        height="23px"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="78px"
        left="7px"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={session?.Date}
        {...getOverrideProps(overrides, "Session Date")}
      ></Text>
      <Button
        width="63px"
        height="18px"
        position="absolute"
        top="9px"
        left="6px"
        size="default"
        isDisabled={false}
        variation="default"
        children="Back"
        {...getOverrideProps(overrides, "Button")}
      ></Button>
    </View>
  );
}
