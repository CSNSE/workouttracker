import React, { useState } from 'react';
import app from './firebase-config'; // Import the Firebase app instance
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    <div className="sign-up-container">
      <div className="header">
        <h1>Workout Tracker</h1>
        <h2>Sign Up</h2>
      </div>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <h6 className='Error'>{error}</h6>}
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="primary-action-button">Sign Up</button>
        <button type="button" onClick={() => navigate ('/login')} className="login-redirect-button">
          Already have an account? Log In
        </button>
      </form>
    </div>
  );
  
}

export default SignUp;
