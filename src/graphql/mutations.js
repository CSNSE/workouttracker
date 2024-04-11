/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPublishedSession = /* GraphQL */ `
  mutation CreatePublishedSession(
    $input: CreatePublishedSessionInput!
    $condition: ModelPublishedSessionConditionInput
  ) {
    createPublishedSession(input: $input, condition: $condition) {
      id
      SessionPublished {
        id
        Type
        Date
        FirebaseUID
        createdAt
        updatedAt
        __typename
      }
      Title
      Description
      createdAt
      updatedAt
      publishedSessionSessionPublishedId
      __typename
    }
  }
`;
export const updatePublishedSession = /* GraphQL */ `
  mutation UpdatePublishedSession(
    $input: UpdatePublishedSessionInput!
    $condition: ModelPublishedSessionConditionInput
  ) {
    updatePublishedSession(input: $input, condition: $condition) {
      id
      SessionPublished {
        id
        Type
        Date
        FirebaseUID
        createdAt
        updatedAt
        __typename
      }
      Title
      Description
      createdAt
      updatedAt
      publishedSessionSessionPublishedId
      __typename
    }
  }
`;
export const deletePublishedSession = /* GraphQL */ `
  mutation DeletePublishedSession(
    $input: DeletePublishedSessionInput!
    $condition: ModelPublishedSessionConditionInput
  ) {
    deletePublishedSession(input: $input, condition: $condition) {
      id
      SessionPublished {
        id
        Type
        Date
        FirebaseUID
        createdAt
        updatedAt
        __typename
      }
      Title
      Description
      createdAt
      updatedAt
      publishedSessionSessionPublishedId
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
