/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSessionPublish = /* GraphQL */ `
  subscription OnCreateSessionPublish(
    $filter: ModelSubscriptionSessionPublishFilterInput
  ) {
    onCreateSessionPublish(filter: $filter) {
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
export const onUpdateSessionPublish = /* GraphQL */ `
  subscription OnUpdateSessionPublish(
    $filter: ModelSubscriptionSessionPublishFilterInput
  ) {
    onUpdateSessionPublish(filter: $filter) {
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
export const onDeleteSessionPublish = /* GraphQL */ `
  subscription OnDeleteSessionPublish(
    $filter: ModelSubscriptionSessionPublishFilterInput
  ) {
    onDeleteSessionPublish(filter: $filter) {
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
