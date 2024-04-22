import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSession } from './graphql/queries';
import { createSessionPublish } from './graphql/mutations';
import { listSessionPublishes } from './graphql/queries';
import { useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import app from './firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import './PublishSession.css';

export default function PublishSession() {
  const [session, setSession] = useState(null);
  const location = useLocation();
  const client = generateClient();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [publishData, setPublishData] = useState({
    Title: "",
    Description: "",
    ProfilePicture: "",
  });
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState(null);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
    });
    return () => unsubscribe();
  }, [auth, db]);

  useEffect(() => {
    const pathSegments = location.pathname.split('/PublishSession/');
    const id = pathSegments[pathSegments.length - 1];
    if (id) {
      fetchSession(id);
      checkPublishes(id);
    }
  }, [location]);

  const checkPublishes = async (id) => {
    try {
      const response = await client.graphql({
        query: listSessionPublishes,
        variables: { input: { Publish: id } },
      });
      const publishItems = response.data.listSessionPublishes.items;
      const matchingID = publishItems.find(item => item.sessionPublishPublishId === id);
      setIsPublished(!!matchingID);
    } catch (error) {
      setError('Error fetching publishes');
    }
  }

  const fetchSession = async (id) => {
    try {
      const sessionData = await client.graphql({
        query: getSession,
        variables: { id: id.replace("__typename", "") },
      });
      if (sessionData.data.getSession) {
        setSession(sessionData.data.getSession);
      }
    } catch (error) {
      setError('Error fetching session');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPublishData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSuccess = (result) => {
    navigate('/MyFeed');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isPublished) {
      setError('This session is already published.');
      return;
    }
    const input = {
      Title: publishData.Title,
      Description: publishData.Description,
      sessionPublishPublishId: session?.id,
      FirstName: profile.firstName,
      DisplayName: user.displayName,
      ProfilePicture: profile.photoURL,
    };
    try {
      const result = await client.graphql({
        query: createSessionPublish,
        variables: { input },
      });
      if (result.data) onSuccess(result.data);
    } catch (error) {
      setError('Error publishing session');
    }
  };

  return (
    <div className="publish-session-container">
      <h1 className="publish-session-title">Publish Session</h1>
      {session ? (
        <div className='Session'>
          <p className='Title'>Session Title: {session.Type}</p>
          <p>Session Date: {session.Date}</p>
        </div>
      ) : (
        <p>No session data available.</p>
      )}
      {error && <p>{error}</p>}
      <form className="publish-session-form" onSubmit={handleSubmit}>
        <input
          name="Title"
          placeholder='Title'
          value={publishData.Title}
          onChange={handleInputChange}
          className="publish-session-input"
        />
        <input
          name="Description"
          placeholder='Description'
          value={publishData.Description}
          onChange={handleInputChange}
          className="publish-session-input"
        />
        <button type='submit' className="publish-session-button">Publish</button>
      </form>
    </div>
  );
}
