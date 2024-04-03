import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Verify() {
    const [verified, setVerified] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const user = auth.currentUser;

        if (user) {
            setVerified(user.emailVerified);
        }
    }, [auth]); 

    const checkVerification = () => {
        auth.currentUser.reload()
            .then(() => {
                const user = auth.currentUser;
                if (user.emailVerified) {
                    setVerified(true);
                } else {
                    setVerified(false);
                }
            });
    };

    return (
        <div className={verified ? "verify-container verified" : "verify-container"}>
            <h2>Verify Email</h2>
            <p>{verified ? 'Email is verified' : 'Email is not verified. Please check your inbox for a verification email.'}</p>
            <button onClick={checkVerification} className={verified ? "hidden" : ""}>
                Check Verification
            </button>
            {verified && (
                <button onClick={() => navigate('/onboarding')} className="next-button">
                    Proceed to Next Page
                </button>
            )}
        </div>
    );
}

export default Verify;
