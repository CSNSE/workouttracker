import React, { useState, useRef, useEffect } from 'react';
import './SettingsForm.css';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref as firebaseStorageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import app from './firebase-config';
import { useNavigate } from 'react-router-dom';

function ChangeProfilePicture({ setError, setSuccess }) {
    const auth = getAuth(app);
    const [profilePic, setProfilePic] = useState(null);
    const wrapperRef = useRef(null); // Create ref for component

    // Handle image change
    const handleImageChange = (event) => setProfilePic(event.target.files[0]);

    // Upload image and get URL
    const uploadImage = async () => {
        if (!profilePic) return null;
        const storage = getStorage();
        const storageReference = firebaseStorageRef(storage, `profileImages/${auth.currentUser.uid}`);
        await uploadBytes(storageReference, profilePic);
        return getDownloadURL(storageReference);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const photoURL = await uploadImage();
            if (photoURL) {
                await updateProfile(auth.currentUser, { photoURL });
                setSuccess("Profile picture updated successfully");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    // Click outside handler
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setError(null);
                setSuccess(null); // Clear messages when clicking outside
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]); // Only re-run if ref changes

    return (
        <div ref={wrapperRef} className="settings-container">
            <form onSubmit={handleSubmit} className="settings-form">
                <label className="settings-label">
                    Upload a profile picture:
                    <input type="file" className="settings-input" onChange={handleImageChange} accept="image/*" />
                </label>
                <button type="submit" className="settings-button">Change Profile Picture</button>
            </form>
        </div>
    );
}

export default ChangeProfilePicture;
