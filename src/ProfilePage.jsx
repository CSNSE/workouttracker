import React from 'react';
import { getAuth } from 'firebase/auth';
import './ProfilePage.css'; // Import the CSS file here
import BackButton from './BackButton';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  return (
    <div className="profile-container"> {/* Use CSS class */}
      <h2 className="profile-header">Profile Page</h2>
      {currentUser && (
        <div>
          <div className="profile-details">
            <p>Welcome, {currentUser.displayName || 'User'}!</p>
            <p>Email: {currentUser.email}</p>
          </div>


          <button className="button" onClick={() => navigate('/Settings')}>Account Settings</button>
        </div>

      )}
    <button className='BackButton' onClick={() => navigate('/')}>Back</button>
    </div>
  );
};

export default ProfilePage;
