import React from 'react';
import './BackButton.css';
import { useNavigate } from 'react-router-dom';
import BigButton from './BigButton';
function BackButton() {
    const navigate = useNavigate();
    return (
        <BigButton label='Back to Home' onClick={() => navigate('/')}/>
    );
    }

export default BackButton;
