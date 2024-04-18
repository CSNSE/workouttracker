import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import { listSessionPublishes } from "./graphql/queries";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaRegComment, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import "./DispSessionFeed.css";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export default function DispSessionFeed() {
  const auth = getAuth();
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const client = generateClient();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
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
          <img src={session.ProfilePicture || 'default-profile.png'} alt="Profile" className="profile-image" />
          <span className="authorName">{session.FirstName}</span>
          <span className="authorUsername">@{session.DisplayName}</span>
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
