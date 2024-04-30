import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const TIMEOUT_PERIOD = 30 * 60 * 1000; 

const CheckAuth = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/');
      } else {
        resetLogoutTimer();
      }
    });

    const events = ['load', 'click', 'keypress', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetLogoutTimer));

    return () => {
      unsubscribe();
      events.forEach(event => window.removeEventListener(event, resetLogoutTimer));
      clearTimeout(logoutTimer);
    };
  }, [navigate, auth]);

  let logoutTimer;
  const resetLogoutTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
        signOut(auth).then(() => {
            navigate('/', { state: { reason: 'inactivity' } });
        }).catch((error) => {
            console.error('Error logging out:', error);
        });
  
    }, TIMEOUT_PERIOD);
  };

  return null; 
};

export default CheckAuth;
