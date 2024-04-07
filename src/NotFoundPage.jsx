// NotFoundPage.js
import React from 'react';
import './NotFoundPage.css';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <h1>404: Page Not Found</h1>
            <p>The page you are looking for doesn’t exist or has been moved.</p>
            <button onClick={() => navigate('/')} className="not-found-button">
                Go to Home
            </button>
        </div>
    );
}

export default NotFoundPage;
