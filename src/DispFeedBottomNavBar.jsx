import React from 'react';
import './DispFeedBottomNavBar.css'; // Ensure to link the CSS file

const DispFeedBottomNavBar = () => {
    return (
        <nav className="bottomNavBar">
            <button className="navItem" onClick={() => console.log('Go to Feed')}>
                <span className="icon">🏠</span>
                <span className="label">Feed</span>
            </button>
            <button className="navItem" onClick={() => console.log('Post Something')}>
                <span className="icon">✏️</span>
                <span className="label">Post</span>
            </button>
            <button className="navItem" onClick={() => console.log('Go to Profile')}>
                <span className="icon">👤</span>
                <span className="label">Profile</span>
            </button>
        </nav>
    );
};

export default DispFeedBottomNavBar;
