import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import './Onboarding.css';
import { useNavigate } from 'react-router-dom';

function Onboarding() {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        if (auth.currentUser && auth.currentUser.displayName) {
            navigate('/');
        }
    }, [auth.currentUser, navigate]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            await updateProfile(auth.currentUser, { displayName: username });
        } catch (error) {
            setError('Failed to update profile. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
        navigate('/')
    };

    return (
        <div className="onboarding-container">
            <h4>Almost Done!</h4>
            <form onSubmit={handleSubmit} className="onboarding-form">
                <label>
                    Create a username
                    <input type="text" value={username} onChange={handleUsernameChange} />
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
