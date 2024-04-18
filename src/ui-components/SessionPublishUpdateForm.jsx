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
import { getSessionPublish, listSessions } from "../graphql/queries";
import { updateSessionPublish } from "../graphql/mutations";
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
export default function SessionPublishUpdateForm(props) {
  const {
    id: idProp,
    sessionPublish: sessionPublishModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Description: "",
    Publish: undefined,
    Title: "",
    FirstName: "",
    DisplayName: "",
    ProfilePicture: "",
  };
  const [Description, setDescription] = React.useState(
    initialValues.Description
  );
  const [Publish, setPublish] = React.useState(initialValues.Publish);
  const [PublishLoading, setPublishLoading] = React.useState(false);
  const [publishRecords, setPublishRecords] = React.useState([]);
  const [Title, setTitle] = React.useState(initialValues.Title);
  const [FirstName, setFirstName] = React.useState(initialValues.FirstName);
  const [DisplayName, setDisplayName] = React.useState(
    initialValues.DisplayName
  );
  const [ProfilePicture, setProfilePicture] = React.useState(
    initialValues.ProfilePicture
  );
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = sessionPublishRecord
      ? { ...initialValues, ...sessionPublishRecord, Publish }
      : initialValues;
    setDescription(cleanValues.Description);
    setPublish(cleanValues.Publish);
    setCurrentPublishValue(undefined);
    setCurrentPublishDisplayValue("");
    setTitle(cleanValues.Title);
    setFirstName(cleanValues.FirstName);
    setDisplayName(cleanValues.DisplayName);
    setProfilePicture(cleanValues.ProfilePicture);
    setErrors({});
  };
  const [sessionPublishRecord, setSessionPublishRecord] = React.useState(
    sessionPublishModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getSessionPublish.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getSessionPublish
        : sessionPublishModelProp;
      const PublishRecord = record ? await record.Publish : undefined;
      setPublish(PublishRecord);
      setSessionPublishRecord(record);
    };
    queryData();
  }, [idProp, sessionPublishModelProp]);
  React.useEffect(resetStateValues, [sessionPublishRecord, Publish]);
  const [currentPublishDisplayValue, setCurrentPublishDisplayValue] =
    React.useState("");
  const [currentPublishValue, setCurrentPublishValue] =
    React.useState(undefined);
  const PublishRef = React.createRef();
  const getIDValue = {
    Publish: (r) => JSON.stringify({ id: r?.id }),
  };
  const PublishIdSet = new Set(
    Array.isArray(Publish)
      ? Publish.map((r) => getIDValue.Publish?.(r))
      : getIDValue.Publish?.(Publish)
  );
  const getDisplayValue = {
    Publish: (r) => `${r?.Type ? r?.Type + " - " : ""}${r?.id}`,
  };
  const validations = {
    Description: [],
    Publish: [],
    Title: [],
    FirstName: [],
    DisplayName: [],
    ProfilePicture: [],
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
  const fetchPublishRecords = async (value) => {
    setPublishLoading(true);
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
        (item) => !PublishIdSet.has(getIDValue.Publish?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setPublishRecords(newOptions.slice(0, autocompleteLength));
    setPublishLoading(false);
  };
  React.useEffect(() => {
    fetchPublishRecords("");
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
          Description: Description ?? null,
          Publish: Publish ?? null,
          Title: Title ?? null,
          FirstName: FirstName ?? null,
          DisplayName: DisplayName ?? null,
          ProfilePicture: ProfilePicture ?? null,
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
            Description: modelFields.Description ?? null,
            sessionPublishPublishId: modelFields?.Publish?.id ?? null,
            Title: modelFields.Title ?? null,
            FirstName: modelFields.FirstName ?? null,
            DisplayName: modelFields.DisplayName ?? null,
            ProfilePicture: modelFields.ProfilePicture ?? null,
          };
          await client.graphql({
            query: updateSessionPublish.replaceAll("__typename", ""),
            variables: {
              input: {
                id: sessionPublishRecord.id,
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
      {...getOverrideProps(overrides, "SessionPublishUpdateForm")}
      {...rest}
    >
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={Description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Description: value,
              Publish,
              Title,
              FirstName,
              DisplayName,
              ProfilePicture,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              Description,
              Publish: value,
              Title,
              FirstName,
              DisplayName,
              ProfilePicture,
            };
            const result = onChange(modelFields);
            value = result?.Publish ?? value;
          }
          setPublish(value);
          setCurrentPublishValue(undefined);
          setCurrentPublishDisplayValue("");
        }}
        currentFieldValue={currentPublishValue}
        label={"Publish"}
        items={Publish ? [Publish] : []}
        hasError={errors?.Publish?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Publish", currentPublishValue)
        }
        errorMessage={errors?.Publish?.errorMessage}
        getBadgeText={getDisplayValue.Publish}
        setFieldValue={(model) => {
          setCurrentPublishDisplayValue(
            model ? getDisplayValue.Publish(model) : ""
          );
          setCurrentPublishValue(model);
        }}
        inputFieldRef={PublishRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Publish"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Session"
          value={currentPublishDisplayValue}
          options={publishRecords
            .filter((r) => !PublishIdSet.has(getIDValue.Publish?.(r)))
            .map((r) => ({
              id: getIDValue.Publish?.(r),
              label: getDisplayValue.Publish?.(r),
            }))}
          isLoading={PublishLoading}
          onSelect={({ id, label }) => {
            setCurrentPublishValue(
              publishRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentPublishDisplayValue(label);
            runValidationTasks("Publish", label);
          }}
          onClear={() => {
            setCurrentPublishDisplayValue("");
          }}
          defaultValue={Publish}
          onChange={(e) => {
            let { value } = e.target;
            fetchPublishRecords(value);
            if (errors.Publish?.hasError) {
              runValidationTasks("Publish", value);
            }
            setCurrentPublishDisplayValue(value);
            setCurrentPublishValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Publish", currentPublishDisplayValue)
          }
          errorMessage={errors.Publish?.errorMessage}
          hasError={errors.Publish?.hasError}
          ref={PublishRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Publish")}
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
              Description,
              Publish,
              Title: value,
              FirstName,
              DisplayName,
              ProfilePicture,
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
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={FirstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Description,
              Publish,
              Title,
              FirstName: value,
              DisplayName,
              ProfilePicture,
            };
            const result = onChange(modelFields);
            value = result?.FirstName ?? value;
          }
          if (errors.FirstName?.hasError) {
            runValidationTasks("FirstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("FirstName", FirstName)}
        errorMessage={errors.FirstName?.errorMessage}
        hasError={errors.FirstName?.hasError}
        {...getOverrideProps(overrides, "FirstName")}
      ></TextField>
      <TextField
        label="Display name"
        isRequired={false}
        isReadOnly={false}
        value={DisplayName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Description,
              Publish,
              Title,
              FirstName,
              DisplayName: value,
              ProfilePicture,
            };
            const result = onChange(modelFields);
            value = result?.DisplayName ?? value;
          }
          if (errors.DisplayName?.hasError) {
            runValidationTasks("DisplayName", value);
          }
          setDisplayName(value);
        }}
        onBlur={() => runValidationTasks("DisplayName", DisplayName)}
        errorMessage={errors.DisplayName?.errorMessage}
        hasError={errors.DisplayName?.hasError}
        {...getOverrideProps(overrides, "DisplayName")}
      ></TextField>
      <TextField
        label="Profile picture"
        isRequired={false}
        isReadOnly={false}
        value={ProfilePicture}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Description,
              Publish,
              Title,
              FirstName,
              DisplayName,
              ProfilePicture: value,
            };
            const result = onChange(modelFields);
            value = result?.ProfilePicture ?? value;
          }
          if (errors.ProfilePicture?.hasError) {
            runValidationTasks("ProfilePicture", value);
          }
          setProfilePicture(value);
        }}
        onBlur={() => runValidationTasks("ProfilePicture", ProfilePicture)}
        errorMessage={errors.ProfilePicture?.errorMessage}
        hasError={errors.ProfilePicture?.hasError}
        {...getOverrideProps(overrides, "ProfilePicture")}
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
          isDisabled={!(idProp || sessionPublishModelProp)}
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
              !(idProp || sessionPublishModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
