/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPublishedSession = /* GraphQL */ `
  query GetPublishedSession($id: ID!) {
    getPublishedSession(id: $id) {
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
export const listPublishedSessions = /* GraphQL */ `
  query ListPublishedSessions(
    $filter: ModelPublishedSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPublishedSessions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        Title
        Description
        createdAt
        updatedAt
        publishedSessionSessionPublishedId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWorkout = /* GraphQL */ `
  query GetWorkout($id: ID!) {
    getWorkout(id: $id) {
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
export const listWorkouts = /* GraphQL */ `
  query ListWorkouts(
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Lift
        Weight
        Reps
        sessionID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const workoutsBySessionID = /* GraphQL */ `
  query WorkoutsBySessionID(
    $sessionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    workoutsBySessionID(
      sessionID: $sessionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        Lift
        Weight
        Reps
        sessionID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
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
export const listSessions = /* GraphQL */ `
  query ListSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Type
        Date
        FirebaseUID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
