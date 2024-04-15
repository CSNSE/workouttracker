import React, { useState } from 'react';
import { getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import app from './firebase-config';
import { useNavigate } from 'react-router-dom';

function ChangeEmail() {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState(''); // Add a state to capture user's current password for re-authentication

    const handleEmailChange = (event) => setNewEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const reauthenticate = async () => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, password);
        return reauthenticateWithCredential(user, credential);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await reauthenticate(); // Re-authenticate the user before attempting to update the email
            await updateEmail(auth.currentUser, newEmail);
            console.log('Email updated successfully to:', newEmail);
            navigate('/profile'); // Navigate to profile or a success page
        } catch (error) {
            console.error('Failed to update email:', error);
            // Implement appropriate error handling
        }
    };

    return (
        <div className="settings-container">
            <form onSubmit={handleSubmit} className="settings-form">
                <label className="settings-label">
                    New Email:
                    <input type="email" className="settings-input" value={newEmail} onChange={handleEmailChange} required />
                </label>
                <label className="settings-label">
                    Current Password: {/* Add a field for the current password */}
                    <input type="password" className="settings-input" value={password} onChange={handlePasswordChange} required />
                </label>
                <button type="submit" className="settings-button">Change Email</button>
            </form>
        </div>
    );
}

export default ChangeEmail;
