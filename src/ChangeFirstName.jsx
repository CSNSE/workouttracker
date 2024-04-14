import React, { useState } from 'react';
import './SettingsForm.css'; // Assuming a shared CSS file
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import app from './firebase-config';
import { useNavigate } from 'react-router-dom';

function ChangeFirstName() {
    const auth = getAuth(app);
    const [firstName, setFirstName] = useState('');
    const db = getFirestore();
    const navigate = useNavigate();

    const handleFirstNameChange = (event) => setFirstName(event.target.value);

    const updateFirestoreUserData = async () => {
        const userData = { firstName };
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, userData);
        console.log('First name updated successfully to:', firstName);
        navigate('/profile');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateFirestoreUserData();
        } catch (error) {
            console.error('Failed to update first name:', error);
        }
    };

    return (
        <div className="settings-container">
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
