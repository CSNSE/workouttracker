import React from 'react';
import './Footer.css'; // Link to the CSS file for styling
import BackButton from './BackButton'; // Ensure this path is correct based on your project structure
import AddWorkout from './AddWorkout';
import { useNavigate } from 'react-router-dom';
import BigButton from './BigButton';
function Footer() {
   const navigate = useNavigate();
    return (
    <div className="footer">
      <BackButton /><BigButton label={'Start a New Workout'} onClick={() => (navigate('/new'))}/>

    </div>
  );
}

export default Footer;
