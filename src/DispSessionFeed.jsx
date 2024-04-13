import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import app from "./firebase-config";
import { listSessionPublishes } from "./graphql/queries";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaRegComment, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import "./DispSessionFeed.css";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export default function DispSessionFeed() {
  const auth = getAuth(app);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const client = generateClient();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setFirstName(docSnap.data().firstName);  // Assuming 'firstName' is the field name in Firestore
        } else {
          console.log("No such document!");
        }
      }
    });
    return () => unsubscribe();
  }, [auth, db]);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const sessionData = await client.graphql({ query: listSessionPublishes });
        setSessions(sessionData.data.listSessionPublishes.items);
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
          <div className='sessionAuthor'>
            <span className="authorName">{firstName || 'User'}</span>
            <span className="authorUsername">@{user ? user.displayName : 'username'}</span>
          </div>
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
