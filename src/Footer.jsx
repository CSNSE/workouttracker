import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css'; // Make sure the path is correct
import { getAuth, signOut } from 'firebase/auth';



const Footer = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    return (
        <footer className="footer">
            <button className='button' onClick={() => navigate('/')}>Sessions</button>
            <button className='button' onClick={() => navigate('/Progress')}>Progress</button>
            <button className='button' onClick={() => navigate('/profile')}>Profile Page</button>
            <button className="button" onClick={() => auth.signOut()}>Sign Out</button>
        </footer>
    );
};

export default Footer;
