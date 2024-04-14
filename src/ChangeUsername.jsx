import React, { useState } from 'react';
import './SettingsForm.css'; // Assuming a shared CSS file
import { getAuth, updateProfile } from "firebase/auth";
import app from './firebase-config';
import { useNavigate } from 'react-router-dom';

function ChangeUsername() {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const [newUsername, setNewUsername] = useState('');

    const handleUsernameChange = (event) => setNewUsername(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateProfile(auth.currentUser, { displayName: newUsername });
            console.log('Username updated successfully to:', newUsername);
            navigate('/profile')
        } catch (error) {
            console.error('Failed to update username:', error);
        }
    };

    return (
        <div className="settings-container">
            <form onSubmit={handleSubmit} className="settings-form">
                <label className="settings-label">
                    New Username:
                    <input type="text" className="settings-input" value={newUsername} onChange={handleUsernameChange} />
                </label>
                <button type="submit" className="settings-button">Change Username</button>
            </form>
        </div>
    );
}

export default ChangeUsername;
