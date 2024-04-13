import React from 'react';
import './DispFeedBottomNavBar.css'; // Ensure to link the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPencilAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const DispFeedBottomNavBar = () => {
    return (
        <nav className="bottomNavBar">
            <button className="navItem" onClick={() => console.log('Post Something')}>
                <FontAwesomeIcon icon={faPencilAlt} className="icon" />
                <span className="label"></span>
            </button>
            <button className="navItem" onClick={() => console.log('Go to Feed')}>
                <FontAwesomeIcon icon={faHome} className="icon" />
                <span className="label"></span>
            </button>
            <button className="navItem" onClick={() => console.log('Go to Profile')}>
                <FontAwesomeIcon icon={faUser} className="icon" />
                <span className="label"></span>
            </button>
        </nav>
    );
};

export default DispFeedBottomNavBar;
