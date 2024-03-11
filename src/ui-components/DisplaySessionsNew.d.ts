/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ButtonProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DisplaySessionsNewOverridesProps = {
    DisplaySessionsNew?: PrimitiveOverrideProps<ViewProps>;
    Type?: PrimitiveOverrideProps<TextProps>;
    "2020/10/10"?: PrimitiveOverrideProps<TextProps>;
    "Frame 2"?: PrimitiveOverrideProps<ViewProps>;
    Button38729748?: PrimitiveOverrideProps<ButtonProps>;
    Button38729749?: PrimitiveOverrideProps<ButtonProps>;
    Button38729750?: PrimitiveOverrideProps<ButtonProps>;
    Button38729751?: PrimitiveOverrideProps<ButtonProps>;
    "Frame 4"?: PrimitiveOverrideProps<ViewProps>;
} & EscapeHatchProps;
export declare type DisplaySessionsNewProps = React.PropsWithChildren<Partial<ViewProps> & {
    session?: any;
} & {
    overrides?: DisplaySessionsNewOverridesProps | undefined | null;
}>;
export default function DisplaySessionsNew(props: DisplaySessionsNewProps): React.ReactElement;
