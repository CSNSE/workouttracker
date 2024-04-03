import React, { useState } from 'react';
import { getAuth, updateProfile, updatePassword } from "firebase/auth";
import './Settings.css';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
function Settings() {
    const [newUsername, setnewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth(); 
    const navigate = useNavigate();



    const handleUpdateDisplayName = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        updateProfile(auth.currentUser, { displayName: newUsername })
            .then(() => {
                setMessage('Username updated successfully.');
            })
            .catch((error) => {
                setError('Failed to update username. ' + error.message);
            });

    }


    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        updatePassword(auth.currentUser, newPassword)
            .then(() => {
                setMessage('Password updated successfully.');
            })
            .catch((error) => {
                if(error.message ==="Firebase: Error (auth/requires-recent-login)."){
                    setError('Please re-login to update password.')
                }

                setError('Failed to update password. ' + error.message);
            });
    };

    return (
        <div className="settings-container">
        <h2>Settings</h2>

        <form onSubmit={handleUpdateDisplayName} className="settings-form">
                <label>
                    New Username:
                    <input 
                        type="name" 
                        value={newUsername} 
                        onChange={e => setnewUsername(e.target.value)} 
                    />
                </label>
                <button type="submit">Update Username</button>
            </form>

            <form onSubmit={handleUpdatePassword} className="settings-form">
                <label>
                    New Password:
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={e => setNewPassword(e.target.value)} 
                    />
                </label>
                <button type="submit">Update Password</button>
            </form>

            {message && <p className={error ? "message error-message" : "message success-message"}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className='BackButton' onClick={() => navigate('/profile')}>Back</button>
        </div>
    );
}

export default Settings;
