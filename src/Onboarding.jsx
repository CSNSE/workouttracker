import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import './Onboarding.css';
import { useNavigate } from 'react-router-dom';

function Onboarding() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        if (auth.currentUser && auth.currentUser.displayName) {
        }
    }, [auth.currentUser, navigate]);

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handleNameChange = (event) => setFirstName(event.target.value);
    const handleImageChange = (event) => setProfilePic(event.target.files[0]);

    const updateFirestoreUserData = async (userId, userData) => {
        const userRef = doc(db, "users", userId);
        try {
            // Ensure that userData contains the correct structure
            console.log("Updating Firestore with userData:", userData);
            await setDoc(userRef, userData, { merge: true });
        } catch (error) {
            console.error("Error writing document: ", error);
            throw error;
        }
    };

    const uploadImage = async () => {
        if (!profilePic) return null;
        const storage = getStorage();
        const storageReference = storageRef(storage, `profileImages/${auth.currentUser.uid}`);
        await uploadBytes(storageReference, profilePic);
        return getDownloadURL(storageReference);
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
            const photoURL = await uploadImage();
            if (photoURL) {
                await updateProfile(auth.currentUser, { displayName: username, photoURL });
            } else {
                await updateProfile(auth.currentUser, { displayName: username });
            }
    
            // Prepare userData with the correct structure
            const userData = {
                firstName,
                photoURL  // This should be a string, directly the URL
            };
            
            await updateFirestoreUserData(auth.currentUser.uid, userData);
            navigate('/');
            console.log("Final userData being sent to Firestore:", userData);

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
                <label>
                    Upload a profile picture
                    <input type="file" onChange={handleImageChange} accept="image/*" />
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
