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
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getPublishedSession, listSessions } from "../graphql/queries";
import { updatePublishedSession } from "../graphql/mutations";
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
export default function PublishedSessionUpdateForm(props) {
  const {
    id: idProp,
    publishedSession: publishedSessionModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    SessionPublished: undefined,
    Title: "",
    Description: "",
  };
  const [SessionPublished, setSessionPublished] = React.useState(
    initialValues.SessionPublished
  );
  const [SessionPublishedLoading, setSessionPublishedLoading] =
    React.useState(false);
  const [sessionPublishedRecords, setSessionPublishedRecords] = React.useState(
    []
  );
  const [Title, setTitle] = React.useState(initialValues.Title);
  const [Description, setDescription] = React.useState(
    initialValues.Description
  );
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = publishedSessionRecord
      ? { ...initialValues, ...publishedSessionRecord, SessionPublished }
      : initialValues;
    setSessionPublished(cleanValues.SessionPublished);
    setCurrentSessionPublishedValue(undefined);
    setCurrentSessionPublishedDisplayValue("");
    setTitle(cleanValues.Title);
    setDescription(cleanValues.Description);
    setErrors({});
  };
  const [publishedSessionRecord, setPublishedSessionRecord] = React.useState(
    publishedSessionModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPublishedSession.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPublishedSession
        : publishedSessionModelProp;
      const SessionPublishedRecord = record
        ? await record.SessionPublished
        : undefined;
      setSessionPublished(SessionPublishedRecord);
      setPublishedSessionRecord(record);
    };
    queryData();
  }, [idProp, publishedSessionModelProp]);
  React.useEffect(resetStateValues, [publishedSessionRecord, SessionPublished]);
  const [
    currentSessionPublishedDisplayValue,
    setCurrentSessionPublishedDisplayValue,
  ] = React.useState("");
  const [currentSessionPublishedValue, setCurrentSessionPublishedValue] =
    React.useState(undefined);
  const SessionPublishedRef = React.createRef();
  const getIDValue = {
    SessionPublished: (r) => JSON.stringify({ id: r?.id }),
  };
  const SessionPublishedIdSet = new Set(
    Array.isArray(SessionPublished)
      ? SessionPublished.map((r) => getIDValue.SessionPublished?.(r))
      : getIDValue.SessionPublished?.(SessionPublished)
  );
  const getDisplayValue = {
    SessionPublished: (r) => `${r?.Type ? r?.Type + " - " : ""}${r?.id}`,
  };
  const validations = {
    SessionPublished: [],
    Title: [],
    Description: [],
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
  const fetchSessionPublishedRecords = async (value) => {
    setSessionPublishedLoading(true);
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
      var loaded = result.filter(
        (item) =>
          !SessionPublishedIdSet.has(getIDValue.SessionPublished?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setSessionPublishedRecords(newOptions.slice(0, autocompleteLength));
    setSessionPublishedLoading(false);
  };
  React.useEffect(() => {
    fetchSessionPublishedRecords("");
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
          SessionPublished: SessionPublished ?? null,
          Title: Title ?? null,
          Description: Description ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
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
          const modelFieldsToSave = {
            publishedSessionSessionPublishedId:
              modelFields?.SessionPublished?.id ?? null,
            Title: modelFields.Title ?? null,
            Description: modelFields.Description ?? null,
          };
          await client.graphql({
            query: updatePublishedSession.replaceAll("__typename", ""),
            variables: {
              input: {
                id: publishedSessionRecord.id,
                ...modelFieldsToSave,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PublishedSessionUpdateForm")}
      {...rest}
    >
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              SessionPublished: value,
              Title,
              Description,
            };
            const result = onChange(modelFields);
            value = result?.SessionPublished ?? value;
          }
          setSessionPublished(value);
          setCurrentSessionPublishedValue(undefined);
          setCurrentSessionPublishedDisplayValue("");
        }}
        currentFieldValue={currentSessionPublishedValue}
        label={"Session published"}
        items={SessionPublished ? [SessionPublished] : []}
        hasError={errors?.SessionPublished?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "SessionPublished",
            currentSessionPublishedValue
          )
        }
        errorMessage={errors?.SessionPublished?.errorMessage}
        getBadgeText={getDisplayValue.SessionPublished}
        setFieldValue={(model) => {
          setCurrentSessionPublishedDisplayValue(
            model ? getDisplayValue.SessionPublished(model) : ""
          );
          setCurrentSessionPublishedValue(model);
        }}
        inputFieldRef={SessionPublishedRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Session published"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Session"
          value={currentSessionPublishedDisplayValue}
          options={sessionPublishedRecords
            .filter(
              (r) =>
                !SessionPublishedIdSet.has(getIDValue.SessionPublished?.(r))
            )
            .map((r) => ({
              id: getIDValue.SessionPublished?.(r),
              label: getDisplayValue.SessionPublished?.(r),
            }))}
          isLoading={SessionPublishedLoading}
          onSelect={({ id, label }) => {
            setCurrentSessionPublishedValue(
              sessionPublishedRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentSessionPublishedDisplayValue(label);
            runValidationTasks("SessionPublished", label);
          }}
          onClear={() => {
            setCurrentSessionPublishedDisplayValue("");
          }}
          defaultValue={SessionPublished}
          onChange={(e) => {
            let { value } = e.target;
            fetchSessionPublishedRecords(value);
            if (errors.SessionPublished?.hasError) {
              runValidationTasks("SessionPublished", value);
            }
            setCurrentSessionPublishedDisplayValue(value);
            setCurrentSessionPublishedValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks(
              "SessionPublished",
              currentSessionPublishedDisplayValue
            )
          }
          errorMessage={errors.SessionPublished?.errorMessage}
          hasError={errors.SessionPublished?.hasError}
          ref={SessionPublishedRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "SessionPublished")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={Title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SessionPublished,
              Title: value,
              Description,
            };
            const result = onChange(modelFields);
            value = result?.Title ?? value;
          }
          if (errors.Title?.hasError) {
            runValidationTasks("Title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("Title", Title)}
        errorMessage={errors.Title?.errorMessage}
        hasError={errors.Title?.hasError}
        {...getOverrideProps(overrides, "Title")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={Description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              SessionPublished,
              Title,
              Description: value,
            };
            const result = onChange(modelFields);
            value = result?.Description ?? value;
          }
          if (errors.Description?.hasError) {
            runValidationTasks("Description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("Description", Description)}
        errorMessage={errors.Description?.errorMessage}
        hasError={errors.Description?.hasError}
        {...getOverrideProps(overrides, "Description")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || publishedSessionModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || publishedSessionModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
