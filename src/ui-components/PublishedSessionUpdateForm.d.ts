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
export declare type PublishedSessionUpdateFormInputValues = {
    SessionPublished?: any;
    Title?: string;
    Description?: string;
};
export declare type PublishedSessionUpdateFormValidationValues = {
    SessionPublished?: ValidationFunction<any>;
    Title?: ValidationFunction<string>;
    Description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PublishedSessionUpdateFormOverridesProps = {
    PublishedSessionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    SessionPublished?: PrimitiveOverrideProps<AutocompleteProps>;
    Title?: PrimitiveOverrideProps<TextFieldProps>;
    Description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PublishedSessionUpdateFormProps = React.PropsWithChildren<{
    overrides?: PublishedSessionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    publishedSession?: any;
    onSubmit?: (fields: PublishedSessionUpdateFormInputValues) => PublishedSessionUpdateFormInputValues;
    onSuccess?: (fields: PublishedSessionUpdateFormInputValues) => void;
    onError?: (fields: PublishedSessionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PublishedSessionUpdateFormInputValues) => PublishedSessionUpdateFormInputValues;
    onValidate?: PublishedSessionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PublishedSessionUpdateForm(props: PublishedSessionUpdateFormProps): React.ReactElement;
