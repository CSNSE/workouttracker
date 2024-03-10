/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createWorkout } from "../graphql/mutations";
const client = generateClient();
export default function WorkoutCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Lift: "",
    Weight: "",
    Reps: "",
  };
  const [Lift, setLift] = React.useState(initialValues.Lift);
  const [Weight, setWeight] = React.useState(initialValues.Weight);
  const [Reps, setReps] = React.useState(initialValues.Reps);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setLift(initialValues.Lift);
    setWeight(initialValues.Weight);
    setReps(initialValues.Reps);
    setErrors({});
  };
  const validations = {
    Lift: [],
    Weight: [],
    Reps: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Lift,
          Weight,
          Reps,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createWorkout.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "WorkoutCreateForm")}
      {...rest}
    >
      <TextField
        label="Lift"
        isRequired={false}
        isReadOnly={false}
        value={Lift}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Lift: value,
              Weight,
              Reps,
            };
            const result = onChange(modelFields);
            value = result?.Lift ?? value;
          }
          if (errors.Lift?.hasError) {
            runValidationTasks("Lift", value);
          }
          setLift(value);
        }}
        onBlur={() => runValidationTasks("Lift", Lift)}
        errorMessage={errors.Lift?.errorMessage}
        hasError={errors.Lift?.hasError}
        {...getOverrideProps(overrides, "Lift")}
      ></TextField>
      <TextField
        label="Weight"
        isRequired={false}
        isReadOnly={false}
        value={Weight}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Lift,
              Weight: value,
              Reps,
            };
            const result = onChange(modelFields);
            value = result?.Weight ?? value;
          }
          if (errors.Weight?.hasError) {
            runValidationTasks("Weight", value);
          }
          setWeight(value);
        }}
        onBlur={() => runValidationTasks("Weight", Weight)}
        errorMessage={errors.Weight?.errorMessage}
        hasError={errors.Weight?.hasError}
        {...getOverrideProps(overrides, "Weight")}
      ></TextField>
      <TextField
        label="Reps"
        isRequired={false}
        isReadOnly={false}
        value={Reps}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Lift,
              Weight,
              Reps: value,
            };
            const result = onChange(modelFields);
            value = result?.Reps ?? value;
          }
          if (errors.Reps?.hasError) {
            runValidationTasks("Reps", value);
          }
          setReps(value);
        }}
        onBlur={() => runValidationTasks("Reps", Reps)}
        errorMessage={errors.Reps?.errorMessage}
        hasError={errors.Reps?.hasError}
        {...getOverrideProps(overrides, "Reps")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
