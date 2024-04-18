import React, { useState } from 'react';
import './SettingsContainer.css';
import ProfilePage from './ProfilePage';
import ChangeUsername from './ChangeUsername';
import ChangeEmail from './ChangeEmail';
import ChangeFirstName from './ChangeFirstName';
import ChangeProfilePicture from './ChangeProfilePicture';
import ChangePassword from './ChangePassword';

function SettingsContainer() {
    const [activePage, setActivePage] = useState('profile');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); 
    const renderComponent = () => {
        const props = { setError ,setSuccess }; // Pass setError to subcomponents
        switch (activePage) {
            case 'username':
                return <ChangeUsername {...props} />;
            case 'email':
                return <ChangeEmail {...props} />;
            case 'firstName':
                return <ChangeFirstName {...props} />;
            case 'profilePicture':
                return <ChangeProfilePicture {...props} />;
            case 'password':
                return <ChangePassword {...props} />;
            case 'profile':
            default:
                return <ProfilePage {...props} />;
        }
    };

    return (
        <div className="settings-page-container">
            <div className="settings-sidebar">
                <button onClick={() => setActivePage('profile')}>Profile</button>
                <button onClick={() => setActivePage('username')}>Change Username</button>
                <button onClick={() => setActivePage('email')}>Change Email</button>
                <button onClick={() => setActivePage('firstName')}>Change First Name</button>
                <button onClick={() => setActivePage('profilePicture')}>Change Profile Picture</button>
                <button onClick={() => setActivePage('password')}>Change Password</button>
            </div>
            <div className="settings-content">
                {renderComponent()}
            </div>
            {error && <h3 className="error-message">{error} </h3>}
            {success && <h3 className="success-message">{success}</h3>}
        </div>
    );
}

export default SettingsContainer;
