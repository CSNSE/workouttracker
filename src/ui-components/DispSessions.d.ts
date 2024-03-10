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
export declare type DispSessionsOverridesProps = {
    DispSessions?: PrimitiveOverrideProps<ViewProps>;
    "Frame 1"?: PrimitiveOverrideProps<ViewProps>;
    Button38464310?: PrimitiveOverrideProps<ButtonProps>;
    Type?: PrimitiveOverrideProps<TextProps>;
    Date?: PrimitiveOverrideProps<TextProps>;
    Button38554339?: PrimitiveOverrideProps<ButtonProps>;
    Button38464320?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type DispSessionsProps = React.PropsWithChildren<Partial<ViewProps> & {
    session?: any;
} & {
    overrides?: DispSessionsOverridesProps | undefined | null;
}>;
export default function DispSessions(props: DispSessionsProps): React.ReactElement;
