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
export declare type SessionPublishCreateFormInputValues = {
    Title?: string;
    Publish?: any;
    Description?: string;
    FirstName?: string;
    DisplayName?: string;
    ProfilePicture?: string;
};
export declare type SessionPublishCreateFormValidationValues = {
    Title?: ValidationFunction<string>;
    Publish?: ValidationFunction<any>;
    Description?: ValidationFunction<string>;
    FirstName?: ValidationFunction<string>;
    DisplayName?: ValidationFunction<string>;
    ProfilePicture?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SessionPublishCreateFormOverridesProps = {
    SessionPublishCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Title?: PrimitiveOverrideProps<TextFieldProps>;
    Publish?: PrimitiveOverrideProps<AutocompleteProps>;
    Description?: PrimitiveOverrideProps<TextFieldProps>;
    FirstName?: PrimitiveOverrideProps<TextFieldProps>;
    DisplayName?: PrimitiveOverrideProps<TextFieldProps>;
    ProfilePicture?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SessionPublishCreateFormProps = React.PropsWithChildren<{
    overrides?: SessionPublishCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SessionPublishCreateFormInputValues) => SessionPublishCreateFormInputValues;
    onSuccess?: (fields: SessionPublishCreateFormInputValues) => void;
    onError?: (fields: SessionPublishCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SessionPublishCreateFormInputValues) => SessionPublishCreateFormInputValues;
    onValidate?: SessionPublishCreateFormValidationValues;
} & React.CSSProperties>;
export default function SessionPublishCreateForm(props: SessionPublishCreateFormProps): React.ReactElement;
