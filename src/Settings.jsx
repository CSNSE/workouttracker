import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsForm.css'; // Import the CSS styles

function Settings() {
    const navigate = useNavigate();

    const handleChangeUsername = () => {
        navigate('/ChangeUsername');
    };

    const handleChangeEmail = () => {
        navigate('/ChangeEmail');
    };

    const handleChangeFirstName = () => {
        navigate('/ChangeFirstName');
    };

    const handleChangeProfilePicture = () => {
        navigate('/ChangeProfilePicture');
    };

    const handleChangePassword = () => {
        navigate('/ChangePassword');
    };

    return (
        <div className="settings-container">
            <button className="settings-button" onClick={handleChangeUsername}>Change Username</button>
            <button className="settings-button" onClick={handleChangeEmail}>Change Email</button>
            <button className="settings-button" onClick={handleChangeFirstName}>Change First Name</button>
            <button className="settings-button" onClick={handleChangeProfilePicture}>Change Profile Picture</button>
            <button className="settings-button" onClick={handleChangePassword}>Change Password</button>
        </div>
    );
}

export default Settings;
