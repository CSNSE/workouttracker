import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function SignOut() {
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Successfully signed out, redirect to login page
            navigate('/login');
        }).catch((error) => {
            // An error happened during the sign-out process
            console.error(error);
        });
    };

    return (
        <div>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

export default SignOut;
