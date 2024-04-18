    import React, { useState } from 'react';
    import './SettingsForm.css'; // Assuming a shared CSS file
    import { getAuth, updateProfile } from 'firebase/auth';
    import { getStorage, ref as firebaseStorageRef, uploadBytes, getDownloadURL } from "firebase/storage";
    import app from './firebase-config';
    import { useNavigate } from 'react-router-dom';

    function ChangeProfilePicture() {
        const auth = getAuth(app);
        const [profilePic, setProfilePic] = useState(null);
        const navigate = useNavigate();
        const handleImageChange = (event) => setProfilePic(event.target.files[0]);

        const uploadImage = async () => {
            if (!profilePic) return null;
            const storage = getStorage();
            const storageReference = firebaseStorageRef(storage, `profileImages/${auth.currentUser.uid}`);
            await uploadBytes(storageReference, profilePic);
            return getDownloadURL(storageReference);
        };

        const handleSubmit = async (event) => {
            event.preventDefault();
            try {
                const photoURL = await uploadImage();
                if (photoURL) {
                    await updateProfile(auth.currentUser, { photoURL });
                }
                navigate('/profile')
            } catch (error) {
                console.log('Failed to update profile picture:', error);
            }
        };

        return (
            <div className="settings-container">
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
