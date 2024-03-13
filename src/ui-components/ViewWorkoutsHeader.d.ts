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
export declare type ViewWorkoutsHeaderOverridesProps = {
    ViewWorkoutsHeader?: PrimitiveOverrideProps<ViewProps>;
    "Session Type"?: PrimitiveOverrideProps<TextProps>;
    "Session Date"?: PrimitiveOverrideProps<TextProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type ViewWorkoutsHeaderProps = React.PropsWithChildren<Partial<ViewProps> & {
    session?: any;
} & {
    overrides?: ViewWorkoutsHeaderOverridesProps | undefined | null;
}>;
export default function ViewWorkoutsHeader(props: ViewWorkoutsHeaderProps): React.ReactElement;
