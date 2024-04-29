import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User created:', userCredential.user);
        sendEmailVerification(userCredential.user)
          .then(() => {
            console.log('Verification email sent.');
            navigate('/verify'); 
          })
          .catch((error) => {
            console.error('Error sending verification email:', error);
            setError('Error: ' + error.message);
          });
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        setError('Signup failed: ' + error.message);
      });
  };

  return (
    <div>
      <div className={styles.title}>Sign up</div>
      <form onSubmit={handleSubmit} className={styles.flipCardForm}>
        <input className={styles.flipCardInput} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
        <input className={styles.flipCardInput} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
        <button type="submit" className={styles.flipCardBtn}>Confirm!</button>
      </form>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}

export default SignUp;
