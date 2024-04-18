import React, { useState, useRef, useEffect } from 'react';
import './SettingsForm.css'; // Assuming a shared CSS file
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import app from './firebase-config';
import { useNavigate } from 'react-router-dom';

function ChangeFirstName({ setError, setSuccess }) {
    const auth = getAuth(app);
    const [firstName, setFirstName] = useState('');
    const db = getFirestore();
    const navigate = useNavigate();
    const wrapperRef = useRef(null); // Ref for the component's outer div

    const handleFirstNameChange = (event) => setFirstName(event.target.value);

    const updateFirestoreUserData = async () => {
        const userData = { firstName };
        const userRef = doc(db, "users", auth.currentUser.uid);
        try {
            await updateDoc(userRef, userData);
            console.log('First name updated successfully to:', firstName);
            setSuccess("First name updated successfully.");
            navigate('/profile');
        } catch (error) {
            console.error('Failed to update first name:', error);
            setError("Failed to update first name: " + error.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateFirestoreUserData();
        } catch (error) {
            setError("Failed to update first name: " + error.message);
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
                    New First Name:
                    <input type="text" className="settings-input" value={firstName} onChange={handleFirstNameChange} />
                </label>
                <button type="submit" className="settings-button">Change First Name</button>
            </form>
        </div>
    );
}

export default ChangeFirstName;
