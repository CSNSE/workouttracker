/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePublishedSession = /* GraphQL */ `
  subscription OnCreatePublishedSession(
    $filter: ModelSubscriptionPublishedSessionFilterInput
  ) {
    onCreatePublishedSession(filter: $filter) {
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
export const onUpdatePublishedSession = /* GraphQL */ `
  subscription OnUpdatePublishedSession(
    $filter: ModelSubscriptionPublishedSessionFilterInput
  ) {
    onUpdatePublishedSession(filter: $filter) {
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
export const onDeletePublishedSession = /* GraphQL */ `
  subscription OnDeletePublishedSession(
    $filter: ModelSubscriptionPublishedSessionFilterInput
  ) {
    onDeletePublishedSession(filter: $filter) {
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
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onCreateWorkout(filter: $filter) {
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
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onUpdateWorkout(filter: $filter) {
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
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout($filter: ModelSubscriptionWorkoutFilterInput) {
    onDeleteWorkout(filter: $filter) {
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
export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession($filter: ModelSubscriptionSessionFilterInput) {
    onCreateSession(filter: $filter) {
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
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession($filter: ModelSubscriptionSessionFilterInput) {
    onUpdateSession(filter: $filter) {
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
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession($filter: ModelSubscriptionSessionFilterInput) {
    onDeleteSession(filter: $filter) {
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
