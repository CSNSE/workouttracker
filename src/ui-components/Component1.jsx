/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps, useAuthSignOutAction } from "./utils";
import { Button, View } from "@aws-amplify/ui-react";
export default function Component1(props) {
  const { overrides, ...rest } = props;
  const buttonOnClick = useAuthSignOutAction({ global: false });
  return (
    <View
      width="100px"
      height="40px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Component1")}
      {...rest}
    >
      <View
        width="100px"
        height="40px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        position="absolute"
        top="0%"
        bottom="0%"
        left="0%"
        right="0%"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Frame 5")}
      ></View>
      <Button
        width="87px"
        height="42px"
        position="absolute"
        top="-2.5%"
        bottom="-2.5%"
        left="6.5%"
        right="6.5%"
        size="default"
        isDisabled={false}
        variation="default"
        children="Sign Out"
        onClick={() => {
          buttonOnClick();
        }}
        {...getOverrideProps(overrides, "Button")}
      ></Button>
    </View>
  );
}
