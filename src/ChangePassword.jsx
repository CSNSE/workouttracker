import React, { useState, useRef, useEffect } from 'react';
import './SettingsForm.css'; // Import the CSS styles
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import app from './firebase-config';
import { useNavigate } from 'react-router-dom';

function ChangePassword({ setError, setSuccess }) { // Assuming you'd pass these as props for unified handling
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();
    const wrapperRef = useRef(null); // Ref for the component's outer div

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
            setSuccess('Password updated successfully.');
        } catch (error) {
            setError(error.message);
        }
    };

    // Click outside to dismiss error or success messages
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setError(null);
                setSuccess(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]); // Only re-run if ref changes

    return (
        <div ref={wrapperRef} className="change-password-container">
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
                <button type='button' className='login-redirect-button' onClick={() => navigate('/Forgot-Password')}>Forgot Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;
