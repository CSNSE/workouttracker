/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { listSessions } from "../graphql/queries";
import { createWorkout } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function NewForm1(props) {
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
    sessionID: undefined,
  };
  const [Lift, setLift] = React.useState(initialValues.Lift);
  const [Weight, setWeight] = React.useState(initialValues.Weight);
  const [Reps, setReps] = React.useState(initialValues.Reps);
  const [sessionID, setSessionID] = React.useState(initialValues.sessionID);
  const [sessionIDLoading, setSessionIDLoading] = React.useState(false);
  const [sessionIDRecords, setSessionIDRecords] = React.useState([]);
  const [selectedSessionIDRecords, setSelectedSessionIDRecords] =
    React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setLift(initialValues.Lift);
    setWeight(initialValues.Weight);
    setReps(initialValues.Reps);
    setSessionID(initialValues.sessionID);
    setCurrentSessionIDValue(undefined);
    setCurrentSessionIDDisplayValue("");
    setErrors({});
  };
  const [currentSessionIDDisplayValue, setCurrentSessionIDDisplayValue] =
    React.useState("");
  const [currentSessionIDValue, setCurrentSessionIDValue] =
    React.useState(undefined);
  const sessionIDRef = React.createRef();
  const getDisplayValue = {
    sessionID: (r) => `${r?.Type ? r?.Type + " - " : ""}${r?.id}`,
  };
  const validations = {
    Lift: [],
    Weight: [],
    Reps: [],
    sessionID: [{ type: "Required" }],
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
  const fetchSessionIDRecords = async (value) => {
    setSessionIDLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ Type: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listSessions.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listSessions?.items;
      var loaded = result.filter((item) => sessionID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setSessionIDRecords(newOptions.slice(0, autocompleteLength));
    setSessionIDLoading(false);
  };
  React.useEffect(() => {
    fetchSessionIDRecords("");
  }, []);
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
          sessionID,
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
      {...getOverrideProps(overrides, "NewForm1")}
      {...rest}
    >
      <SelectField
        label="Lift"
        placeholder="Please select an option"
        isDisabled={false}
        value={Lift}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Lift: value,
              Weight,
              Reps,
              sessionID,
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
      ></SelectField>
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
              sessionID,
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
              sessionID,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              Lift,
              Weight,
              Reps,
              sessionID: value,
            };
            const result = onChange(modelFields);
            value = result?.sessionID ?? value;
          }
          setSessionID(value);
          setCurrentSessionIDValue(undefined);
        }}
        currentFieldValue={currentSessionIDValue}
        label={"Session id"}
        items={sessionID ? [sessionID] : []}
        hasError={errors?.sessionID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("sessionID", currentSessionIDValue)
        }
        errorMessage={errors?.sessionID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.sessionID(
                sessionIDRecords.find((r) => r.id === value) ??
                  selectedSessionIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentSessionIDDisplayValue(
            value
              ? getDisplayValue.sessionID(
                  sessionIDRecords.find((r) => r.id === value) ??
                    selectedSessionIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentSessionIDValue(value);
          const selectedRecord = sessionIDRecords.find((r) => r.id === value);
          if (selectedRecord) {
            setSelectedSessionIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={sessionIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Session id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Session"
          value={currentSessionIDDisplayValue}
          options={sessionIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.sessionID?.(r),
            }))}
          isLoading={sessionIDLoading}
          onSelect={({ id, label }) => {
            setCurrentSessionIDValue(id);
            setCurrentSessionIDDisplayValue(label);
            runValidationTasks("sessionID", label);
          }}
          onClear={() => {
            setCurrentSessionIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchSessionIDRecords(value);
            if (errors.sessionID?.hasError) {
              runValidationTasks("sessionID", value);
            }
            setCurrentSessionIDDisplayValue(value);
            setCurrentSessionIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("sessionID", currentSessionIDValue)}
          errorMessage={errors.sessionID?.errorMessage}
          hasError={errors.sessionID?.hasError}
          ref={sessionIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "sessionID")}
        ></Autocomplete>
      </ArrayField>
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
