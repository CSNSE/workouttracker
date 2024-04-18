import React, { useState, useRef, useEffect } from 'react';
import { getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import app from './firebase-config';
import { useNavigate } from 'react-router-dom';

function ChangeEmail({ setError, setSuccess }) {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const wrapperRef = useRef(null); // Ref for the component's outer div

    const handleEmailChange = (event) => setNewEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const reauthenticate = async () => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, password);
        try {
            await reauthenticateWithCredential(user, credential);
        } catch (error) {
            setError("Failed to reauthenticate: " + error.message);
            throw error; // Re-throw to stop further execution in handleSubmit
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await reauthenticate();
            await updateEmail(auth.currentUser, newEmail);
            setSuccess("Email updated successfully to " + newEmail);
            navigate('/profile');
        } catch (error) {
            setError("Failed to update email: " + error.message);
        }
    };

    // Click outside to dismiss error or success messages
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setError(null);
                setSuccess(null); // Clear messages when clicking outside
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]); // Only re-run if ref changes

    return (
        <div ref={wrapperRef} className="settings-container">
            <form onSubmit={handleSubmit} className="settings-form">
                <label className="settings-label">
                    New Email:
                    <input type="email" className="settings-input" value={newEmail} onChange={handleEmailChange} required />
                </label>
                <label className="settings-label">
                    Current Password:
                    <input type="password" className="settings-input" value={password} onChange={handlePasswordChange} required />
                </label>
                <button type="submit" className="settings-button">Change Email</button>
            </form>
        </div>
    );
}

export default ChangeEmail;
