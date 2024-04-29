import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Auth.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // To get the state passed during navigation
  const auth = getAuth();

  useEffect(() => {

    if (location.state?.reason === 'inactivity') {
      setError('You have been logged out due to inactivity. Please log in again.');
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        console.log('Logged in as:', userCredential.user);
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Error signing in:', error.message);
        if (error.message === 'Firebase: Error (auth/invalid-credential).') {
          setError('The email address or password is incorrect.');
        } else if (error.message === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).') {
            setError('Too many failed log-in attempts. Please try again later.');
        } else if (error.message === 'Firebase: Error (auth/user-disabled).') {
            setError('This account has been disabled.');
        } else {
            setError('Failed to sign in. Please try again.');
        }
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.switch}>
        <input type="checkbox" className={styles.toggle} />
        <span className={styles.slider}></span>
        <div className={styles.flipCardInner}>
          <div className={styles.flipCardFront}>
            <div className={styles.title}>Log in</div>
            <form onSubmit={handleSubmit} className={styles.flipCardForm}>
              <input
                className={styles.flipCardInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                required
              />
              <input
                className={styles.flipCardInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                required
              />
              <button type="submit" className={styles.flipCardBtn}>Let's go!</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
