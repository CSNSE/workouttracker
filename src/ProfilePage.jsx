import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import app from './firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
          console.log("Image URL:", docSnap.data().photoURL); // Log the URL
        } else {
          console.log("No such document!");
        }
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  return (
    <div className="profile-container">
      <h2 className="profile-header">Profile Page</h2>
      {user ? (
        <div>
          <div className="profile-image-container">
            <img
              src={profile.photoURL || 'default-profile.png'}
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="profile-details">
            <p>Welcome, {profile.firstName || user.displayName || 'User'}!</p>
            <p>Username: {user.displayName || 'User'}!</p>
            <p>Email: {user.email}</p>
          </div>
          <button className="button" onClick={() => navigate('/Settings')}>Account Settings</button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
      <button className="BackButton" onClick={() => navigate('/')}>Back</button>
    </div>
  );
};

export default ProfilePage;
