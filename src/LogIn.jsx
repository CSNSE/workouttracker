import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Auth.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
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
        navigate('/'); // Navigate to the home page on success
      })
      .catch((error) => {
        console.error('Error signing in:', error.message);
        setError('Login failed: ' + error.message);
      });
  };

  return (
    <div>
      <div className={styles.title}>Log in</div>
      <form onSubmit={handleSubmit} className={styles.flipCardForm}>
        <input className={styles.flipCardInput} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
        <input className={styles.flipCardInput} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
        <button type="submit" className={styles.flipCardBtn}>Let's go!</button>
      </form>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}

export default Login;
