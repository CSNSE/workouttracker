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
export declare type SessionPublishUpdateFormInputValues = {
    Description?: string;
    Publish?: any;
    Title?: string;
    FirstName?: string;
    DisplayName?: string;
};
export declare type SessionPublishUpdateFormValidationValues = {
    Description?: ValidationFunction<string>;
    Publish?: ValidationFunction<any>;
    Title?: ValidationFunction<string>;
    FirstName?: ValidationFunction<string>;
    DisplayName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SessionPublishUpdateFormOverridesProps = {
    SessionPublishUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Description?: PrimitiveOverrideProps<TextFieldProps>;
    Publish?: PrimitiveOverrideProps<AutocompleteProps>;
    Title?: PrimitiveOverrideProps<TextFieldProps>;
    FirstName?: PrimitiveOverrideProps<TextFieldProps>;
    DisplayName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SessionPublishUpdateFormProps = React.PropsWithChildren<{
    overrides?: SessionPublishUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sessionPublish?: any;
    onSubmit?: (fields: SessionPublishUpdateFormInputValues) => SessionPublishUpdateFormInputValues;
    onSuccess?: (fields: SessionPublishUpdateFormInputValues) => void;
    onError?: (fields: SessionPublishUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SessionPublishUpdateFormInputValues) => SessionPublishUpdateFormInputValues;
    onValidate?: SessionPublishUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SessionPublishUpdateForm(props: SessionPublishUpdateFormProps): React.ReactElement;
