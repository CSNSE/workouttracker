import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, setDoc, getFirestore } from "firebase/firestore";
import './Onboarding.css';
import { useNavigate } from 'react-router-dom';

function Onboarding() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        // Redirect if user already has a displayName
        if (auth.currentUser && auth.currentUser.displayName) {
        }
    }, [auth.currentUser, navigate]);

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handleNameChange = (event) => setFirstName(event.target.value);

    const updateFirestoreUserData = async (userId, userData) => {
        const userRef = doc(db, "users", userId);
        try {
            await setDoc(userRef, userData, { merge: true });
        } catch (error) {
            console.error("Error writing document: ", error);
            throw error;  // Re-throw to be handled in catch block of handleSubmit
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        if (!auth.currentUser) {
            setError('No authenticated user found.');
            setLoading(false);
            return;
        }

        try {
            // Update displayName using Firebase Auth
            await updateProfile(auth.currentUser, { displayName: username });

            // Update custom data in Firestore
            await updateFirestoreUserData(auth.currentUser.uid, { firstName });

            // Navigate to home or dashboard
            navigate('/');
        } catch (error) {
            setError('Failed to update profile. Please try again.');
            console.error("Error updating profile: ", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="onboarding-container">
            <h4>Almost Done!</h4>
            <form onSubmit={handleSubmit} className="onboarding-form">
                <label>
                    What is your first name?
                    <input type="text" value={firstName} onChange={handleNameChange} required />
                </label>
                <label>
                    Create a username
                    <input type="text" value={username} onChange={handleUsernameChange} required />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <div>
                <button className='button' onClick={() => navigate('/')}>Create username later</button>
            </div>
        </div>
    );
}

export default Onboarding;
