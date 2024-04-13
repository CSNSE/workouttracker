/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSessionPublish = /* GraphQL */ `
  mutation CreateSessionPublish(
    $input: CreateSessionPublishInput!
    $condition: ModelSessionPublishConditionInput
  ) {
    createSessionPublish(input: $input, condition: $condition) {
      id
      Description
      Publish {
        id
        Type
        Date
        FirebaseUID
        createdAt
        updatedAt
        __typename
      }
      Title
      FirstName
      DisplayName
      createdAt
      updatedAt
      sessionPublishPublishId
      __typename
    }
  }
`;
export const updateSessionPublish = /* GraphQL */ `
  mutation UpdateSessionPublish(
    $input: UpdateSessionPublishInput!
    $condition: ModelSessionPublishConditionInput
  ) {
    updateSessionPublish(input: $input, condition: $condition) {
      id
      Description
      Publish {
        id
        Type
        Date
        FirebaseUID
        createdAt
        updatedAt
        __typename
      }
      Title
      FirstName
      DisplayName
      createdAt
      updatedAt
      sessionPublishPublishId
      __typename
    }
  }
`;
export const deleteSessionPublish = /* GraphQL */ `
  mutation DeleteSessionPublish(
    $input: DeleteSessionPublishInput!
    $condition: ModelSessionPublishConditionInput
  ) {
    deleteSessionPublish(input: $input, condition: $condition) {
      id
      Description
      Publish {
        id
        Type
        Date
        FirebaseUID
        createdAt
        updatedAt
        __typename
      }
      Title
      FirstName
      DisplayName
      createdAt
      updatedAt
      sessionPublishPublishId
      __typename
    }
  }
`;
export const createWorkout = /* GraphQL */ `
  mutation CreateWorkout(
    $input: CreateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    createWorkout(input: $input, condition: $condition) {
      id
      Lift
      Weight
      Reps
      sessionID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateWorkout = /* GraphQL */ `
  mutation UpdateWorkout(
    $input: UpdateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    updateWorkout(input: $input, condition: $condition) {
      id
      Lift
      Weight
      Reps
      sessionID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteWorkout = /* GraphQL */ `
  mutation DeleteWorkout(
    $input: DeleteWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    deleteWorkout(input: $input, condition: $condition) {
      id
      Lift
      Weight
      Reps
      sessionID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createSession = /* GraphQL */ `
  mutation CreateSession(
    $input: CreateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    createSession(input: $input, condition: $condition) {
      id
      Type
      Date
      Workouts {
        nextToken
        __typename
      }
      FirebaseUID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateSession = /* GraphQL */ `
  mutation UpdateSession(
    $input: UpdateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    updateSession(input: $input, condition: $condition) {
      id
      Type
      Date
      Workouts {
        nextToken
        __typename
      }
      FirebaseUID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteSession = /* GraphQL */ `
  mutation DeleteSession(
    $input: DeleteSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    deleteSession(input: $input, condition: $condition) {
      id
      Type
      Date
      Workouts {
        nextToken
        __typename
      }
      FirebaseUID
      createdAt
      updatedAt
      __typename
    }
  }
`;
