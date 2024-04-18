import React, { useState, useRef, useEffect } from 'react';
import './SettingsForm.css'; // Assuming a shared CSS file
import { getAuth, updateProfile } from "firebase/auth";
import app from './firebase-config';
import { useNavigate } from 'react-router-dom';

function ChangeUsername({ setError, setSuccess }) {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const [newUsername, setNewUsername] = useState('');
    const wrapperRef = useRef(null); // Ref for the component's outer div

    const handleUsernameChange = (event) => setNewUsername(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateProfile(auth.currentUser, { displayName: newUsername });
            console.log('Username updated successfully to:', newUsername);
            setSuccess("Username updated successfully."); // Set success message
            navigate('/profile');
        } catch (error) {
            console.error('Failed to update username:', error);
            setError(error.message); // Set error message
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
                    New Username:
                    <input type="text" className="settings-input" value={newUsername} onChange={handleUsernameChange} />
                </label>
                <button type="submit" className="settings-button">Change Username</button>
            </form>
        </div>
    );
}

export default ChangeUsername;
