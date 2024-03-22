import React from 'react';
import './Footer.css'; // Link to the CSS file for styling
import BackButton from './BackButton'; // Ensure this path is correct based on your project structure
import { useNavigate } from 'react-router-dom';
import BigButton from './BigButton';
import CustomSessionCreateForm from './CustomSessionCreateForm';
function Footer() {
   const navigate = useNavigate();
    return (
    <div className="footer">
      <button className='button' onClick={() => navigate('/new')}>Add Workout</button>
      <BackButton/>
    </div>
  );
}

export default Footer;
