import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import app from "./firebase-config";
  import { listSessionPublishes } from "./graphql/queries";
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
        const sessionData = await client.graphql({ query: listSessionPublishes });
        setSessions(sessionData.data.listSessionPublishes.items); // Make sure this matches your actual data structure returned from GraphQL
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    }
    fetchSessions();
  }, [client]);

  const handleViewClick = (sessionPublishPublishId) => {
    navigate(`/DispWorkouts/${sessionPublishPublishId}`);
  };
  return (
    <div className="sessionFeed">
      {sessions.map((session) => (
        <div key={session.id} className="sessionCard">
          <div className='sessionAuthor'>{(user ? user.displayName : 'User')}</div>
          <div className="sessionTitle">{session.Title}</div>
          <div className='sessionDescription'>{session.Description}</div>
          <button className="viewButton" onClick={() => handleViewClick(session.sessionPublishPublishId)}>
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
