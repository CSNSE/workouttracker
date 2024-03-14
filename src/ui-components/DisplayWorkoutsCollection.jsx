import * as React from "react";
import { useLocation } from "react-router-dom";
import DisplayWorkouts from "./DisplayWorkouts";
import { getOverrideProps } from "./utils";
import { Collection, Placeholder } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { listWorkouts } from "../graphql/queries";

const client = generateClient();

export default function DisplayWorkoutsCollection(props) {
  const { overrideItems, overrides, ...rest } = props;
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();
  const pageSize = 6; // You can adjust this as needed
  const [sessionID, setSessionID] = React.useState('');

  // Extract sessionID from URL on component mount
  React.useEffect(() => {
    // Assuming the path is "/workouts/session/<sessionID>"
    const pathSegments = location.pathname.split('/');
    const sessionIdIndex = pathSegments.findIndex(segment => segment === "session") + 1;
    if (sessionIdIndex > 0 && pathSegments.length > sessionIdIndex) {
      setSessionID(pathSegments[sessionIdIndex]);
    }
  }, [location]);

  // Load workouts by sessionID
  React.useEffect(() => {
    if (!sessionID) return; // Don't load if sessionID is not set

    const loadWorkoutsBySessionID = async () => {
      setLoading(true);
      const variables = {
        filter: {
          sessionID: {
            eq: sessionID // Filtering by sessionID
          }
        },
        limit: pageSize,
      };

      try {
        const result = await client.graphql({
          query: listWorkouts,
          variables,
        });

        if (result.data && result.data.listWorkouts) {
          setItems(result.data.listWorkouts.items);
        }
      } catch (error) {
        console.error("Failed to load workouts:", error);
      }

      setLoading(false);
    };

    loadWorkoutsBySessionID();
  }, [sessionID, pageSize]);

  return (
    <div {...getOverrideProps(overrides, "DisplayWorkoutsCollection")} {...rest}>
      {loading ? (
        <Placeholder size="large" />
      ) : (
        <Collection
          type="list"
          direction="column"
          justifyContent="left"
          items={items}
        >
          {(item, index) => (
            <DisplayWorkouts
              workout={item}
              key={item.id || index}
              {...(overrideItems && overrideItems({ item, index }))}
            />
          )}
        </Collection>
      )}
    </div>
  );
}
