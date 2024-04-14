import React, { useState } from 'react';
import { getAuth, updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref as firebaseStorageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

function Setting() {
    const [newUsername, setNewUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Define the loading state
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    const handleImageChange = (event) => setProfilePic(event.target.files[0]);

    const handleFirstNameChange = (event) => setFirstName(event.target.value);

    const handleCurrentPasswordChange = (event) => setCurrentPassword(event.target.value);

    const handleNewPasswordChange = (event) => setNewPassword(event.target.value);

    const reauthenticate = async () => {
        const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
        try {
            await reauthenticateWithCredential(auth.currentUser, credential);
        } catch (error) {
            throw new Error('Reauthentication failed: ' + error.message);
        }
    };

    const uploadImage = async () => {
        if (!profilePic) {
            console.log("No file to upload.");
            return null;
        }
        const storage = getStorage();
        const storageReference = firebaseStorageRef(storage, `profileImages/${auth.currentUser.uid}`);
        await uploadBytes(storageReference, profilePic);
        return getDownloadURL(storageReference);
    };

    const updateFirestoreUserData = async (photoURL) => {
        const userData = { firstName };
        if (photoURL) userData.photoURL = photoURL;
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, userData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            let photoURL = await uploadImage();

            if (currentPassword && newPassword) {
                await reauthenticate();
                await updatePassword(auth.currentUser, newPassword);
            }

            const updates = {};
            if (newUsername !== auth.currentUser.displayName) {
                updates.displayName = newUsername;
            }
            if (photoURL) {
                await updateProfile(auth.currentUser, { photoURL });
            }

            if (Object.keys(updates).length > 0) {
                await updateProfile(auth.currentUser, updates);
            }

            if (firstName) {
                await updateFirestoreUserData({ firstName, photoURL });
            }

            setMessage('Profile updated successfully.');
            navigate('/profile');
        } catch (error) {
            setError(`Failed to update profile and/or password. ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="settings-container">
            <h2>Settings</h2>
            <form onSubmit={handleSubmit} className="settings-form">
                <label>New Username:
                    <input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)} />
                </label>
                <label>First Name:
                    <input type="text" value={firstName} onChange={handleFirstNameChange} />
                </label>
                <label>Profile Picture:
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                </label>
                <label>Current Password (required for password changes):
                    <input type="password" value={currentPassword} onChange={handleCurrentPasswordChange} />
                </label>
                <label>New Password:
                    <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
                </label>
                <button type="submit" disabled={loading}>Update Profile</button>
                {message && <p className={error ? "error-message" : "success-message"}>{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
            <button onClick={() => navigate('/profile')}>Back</button>
        </div>
    );
}

export default Setting;
