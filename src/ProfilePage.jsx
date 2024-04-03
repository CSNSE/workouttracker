import React, { useState, useEffect } from 'react';
import './ProfilePage.css'; // Import the CSS file here
import { useNavigate } from 'react-router-dom';
import app from './firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="profile-container">
      <h2 className="profile-header">Profile Page</h2>
      {user ? (
        <div>
          <div className="profile-details">
            <p>Welcome, {user.displayName || 'User'}!</p>
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
