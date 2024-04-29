import React, { useState } from 'react';
import app from './firebase-config'; // Import the Firebase app instance
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState(''); // Add a new state variable for the name
  const navigate = useNavigate();

  const auth = getAuth(app); // Pass the Firebase app instance to getAuth

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log('User created:', user);

        sendEmailVerification(user)
          .then(() => {
            console.log('Verification email sent.');
            navigate('/verify');
          })
          .catch((error) => {
            console.error('Error sending verification email:', error);
          });
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        setError('Error signing up: ' + error.message);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.switch}>
        <input type="checkbox" className={styles.toggle} />
        <span className={styles.slider}></span>
        <div className={styles.flipCardInner}>
          <div className={styles.flipCardBack}>
            <div className={styles.title}>Sign up</div>
            <form onSubmit={handleSubmit} className={styles.flipCardForm}>
              <input
                className={styles.flipCardInput}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                type="text"
                required
              />
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
              <button type="submit" className={styles.flipCardBtn}>Confirm!</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default SignUp;
