import React from 'react';
import './Footer.css'; // Link to the CSS file for styling
import BackButton from './BackButton'; // Ensure this path is correct based on your project structure
import { useNavigate } from 'react-router-dom';
import BigButton from './BigButton';
import SignOutButton from './SignOutButton';
import CustomSessionCreateForm from './CustomSessionCreateForm';
import Component1 from './ui-components/Component1';

function Footer() {
   const navigate = useNavigate();
    return (
    <div className="footer">
      <button className='button' onClick={() => navigate('/new')}>Add Session</button>
      <BackButton/>
      <SignOutButton/>
    </div>
  );
}

export default Footer;
