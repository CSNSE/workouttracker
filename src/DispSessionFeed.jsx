import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import app from "./firebase-config";
import { listSessions } from "./graphql/queries";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaRegComment, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import "./DispSessionFeed.css";

export default function DispSessionFeed() {
  const auth = getAuth(app);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const client = generateClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const sessionData = await client.graphql({ query: listSessions });
        setSessions(sessionData.data.listSessions.items);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    }
    fetchSessions();
  }, [client]);

  const handleViewClick = (sessionId) => {
    navigate(`/DispWorkouts/${sessionId}`);
  };

  return (
    <div className="sessionFeed">
      {sessions.map((session) => (
        <div key={session.id} className="sessionCard">
          <div className="sessionTitle">{session.Type}</div>
          <div className='sessionAuthor'>{"@" + (user ? user.displayName : 'User')}</div>
          <button className="viewButton" onClick={() => handleViewClick(session.id)}>
            View Details
          </button>
          <div className="sessionActions">
            <button className="actionButton">
              <FaRegThumbsUp /> Like
            </button>
            <button className="actionButton">
              <FaRegComment /> Comment
            </button>
            <button className="actionButton">
              <FaRegThumbsDown /> Dislike
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
