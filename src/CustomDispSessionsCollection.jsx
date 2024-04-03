import React, { useState, useEffect } from "react";
import CustomDispSessions from "./CustomDispSessions";
import { generateClient } from "aws-amplify/api";
import { listSessions } from "./graphql/queries";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./CustomDispSessions.css"; // Make sure the path to your CSS file is correct

const client = generateClient();

export default function CustomDispSessionCollection() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                fetchSessions(user.uid);
            } else {
                // Handle the case where there is no user logged in
                setSessions([]);
            }
        });
    }, [auth]);

    const fetchSessions = async (userId) => {
        if (!userId) return;

        setLoading(true);
        try {
            const { data } = await client.graphql({
                query: listSessions,
                variables: { filter: { FirebaseUID: { eq: userId } } }
            });
            setSessions(data.listSessions.items);
        } catch (error) {
            console.error("Error fetching sessions:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
      <div className="customDispSessionCollection">
          {loading ? (
              <div>Loading sessions...</div>
          ) : (
              sessions.map(session => (
                  <CustomDispSessions key={session.id} session={session} />
              ))
          )}
      </div>
  );  
}
