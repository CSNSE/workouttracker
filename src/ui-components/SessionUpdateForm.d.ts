/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SessionUpdateFormInputValues = {
    Type?: string;
    Date?: string;
    Workouts?: any[];
    FirebaseUID?: string;
};
export declare type SessionUpdateFormValidationValues = {
    Type?: ValidationFunction<string>;
    Date?: ValidationFunction<string>;
    Workouts?: ValidationFunction<any>;
    FirebaseUID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SessionUpdateFormOverridesProps = {
    SessionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Type?: PrimitiveOverrideProps<TextFieldProps>;
    Date?: PrimitiveOverrideProps<TextFieldProps>;
    Workouts?: PrimitiveOverrideProps<AutocompleteProps>;
    FirebaseUID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SessionUpdateFormProps = React.PropsWithChildren<{
    overrides?: SessionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    session?: any;
    onSubmit?: (fields: SessionUpdateFormInputValues) => SessionUpdateFormInputValues;
    onSuccess?: (fields: SessionUpdateFormInputValues) => void;
    onError?: (fields: SessionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SessionUpdateFormInputValues) => SessionUpdateFormInputValues;
    onValidate?: SessionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SessionUpdateForm(props: SessionUpdateFormProps): React.ReactElement;
