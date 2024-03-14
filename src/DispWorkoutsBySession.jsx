// DispWorkoutsBySession.jsx

import * as React from "react";
import { Text, View } from "@aws-amplify/ui-react";
const DispWorkoutsBySession = ({ workout }) => {
    return (
    <View>
      <Text>{`Lift: ${workout.Lift}`}</Text>
      <Text>{`Weight: ${workout.Weight}`}</Text>
      <Text>{`Reps: ${workout.Reps}`}</Text>
    </View>
  );
};

export default DispWorkoutsBySession;
