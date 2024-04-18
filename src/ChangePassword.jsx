import React, { useState } from 'react';
import './SettingsForm.css'; // Import the CSS styles
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import app from './firebase-config';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "currentPassword") {
            setCurrentPassword(value);
        } else if (name === "newPassword") {
            setNewPassword(value);
        }
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();
        try {
            const auth = getAuth(app);
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            console.log('Password updated successfully');
            navigate("/dashboard");
        } catch (error) {
            console.error('Failed to update password:', error);
            setError(error.message);
        }
    };

    return (
        <div className="change-password-container">
            {error && <p className="change-password-error">{error}</p>}
            <form onSubmit={handleChangePassword} className="change-password-form">
                <label className="change-password-label">
                    Current Password:
                    <input
                        type="password"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={handleChange}
                        required
                        className="change-password-input"
                    />
                </label>
                <label className="change-password-label">
                    New Password:
                    <input
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleChange}
                        required
                        className="change-password-input"
                    />
                </label>
                <button type="submit" className="change-password-button">Change Password</button>
                <button type='button' className='login-redirect-button' onClick={() => navigate('/Forgot-Password')}>Forgot Password</button> {/* Add a cancel button to navigate back to the dashboard */}
            </form>
        </div>
    );
}

export default ChangePassword;
