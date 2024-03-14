/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { TextProps, ViewProps } from "@aws-amplify/ui-react";
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
export declare type DisplayWorkoutsOverridesProps = {
    DisplayWorkouts?: PrimitiveOverrideProps<ViewProps>;
    Exercise?: PrimitiveOverrideProps<TextProps>;
    Reps?: PrimitiveOverrideProps<TextProps>;
    Weight?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type DisplayWorkoutsProps = React.PropsWithChildren<Partial<ViewProps> & {
    workout?: any;
} & {
    overrides?: DisplayWorkoutsOverridesProps | undefined | null;
}>;
export default function DisplayWorkouts(props: DisplayWorkoutsProps): React.ReactElement;
