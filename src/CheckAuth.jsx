import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Correctly import onAuthStateChanged

const CheckAuth = () => {
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize the Firebase auth object
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login'); 
      }
    });

    // Return the unsubscribe function to ensure we unsubscribe on component unmount
    return () => unsubscribe();
  }, [navigate]);

  return null; // Return null if you don't want to render anything
};

export default CheckAuth;
