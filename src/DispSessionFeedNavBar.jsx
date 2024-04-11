import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DispSessionFeedNavBar.css'; // Ensure this file exists and the path is correct

const DispSessionFeedNavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="dispSessionFeedNavBar">
      <div className="navContainer">
        <ul className='navLinks'>
            <li><button onClick={() => navigate('/profile')}>Profile</button></li>
            <li><button onClick={() => navigate('/display')}>Sessions</button></li>
        </ul>
        <div className="logo" onClick={() => navigate('/')}>
          WorkoutTracker
        </div>
        <ul className="navLinks">
          <li><button onClick={() => navigate('/challenges')}>Challenges</button></li>
          <li><button onClick={() => navigate('/settings')}>Settings</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default DispSessionFeedNavBar;
