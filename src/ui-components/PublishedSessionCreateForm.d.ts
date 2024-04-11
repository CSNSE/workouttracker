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
export declare type PublishedSessionCreateFormInputValues = {
    SessionPublished?: any;
    Title?: string;
    Description?: string;
};
export declare type PublishedSessionCreateFormValidationValues = {
    SessionPublished?: ValidationFunction<any>;
    Title?: ValidationFunction<string>;
    Description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PublishedSessionCreateFormOverridesProps = {
    PublishedSessionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    SessionPublished?: PrimitiveOverrideProps<AutocompleteProps>;
    Title?: PrimitiveOverrideProps<TextFieldProps>;
    Description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PublishedSessionCreateFormProps = React.PropsWithChildren<{
    overrides?: PublishedSessionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PublishedSessionCreateFormInputValues) => PublishedSessionCreateFormInputValues;
    onSuccess?: (fields: PublishedSessionCreateFormInputValues) => void;
    onError?: (fields: PublishedSessionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PublishedSessionCreateFormInputValues) => PublishedSessionCreateFormInputValues;
    onValidate?: PublishedSessionCreateFormValidationValues;
} & React.CSSProperties>;
export default function PublishedSessionCreateForm(props: PublishedSessionCreateFormProps): React.ReactElement;
