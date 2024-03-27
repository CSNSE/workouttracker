import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // This should be the same CSS file used for SignUp

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook for navigation
  const auth = getAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log('Logged in as:', userCredential.user);
        navigate('/'); // Navigate to the home page or dashboard after login
      })
      .catch((error) => {
        console.error('Error signing in:', error.message);
        // Implement error handling or UI feedback
      });
  };

  return (
    <div className="sign-up-container">
      <div className="header">
        <h1>Workout Tracker</h1>
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="primary-action-button">Log In</button>
        <button type="button" onClick={() => navigate('/signup')} className="login-redirect-button">
          Don't have an account? Sign Up
        </button>
        <button type='button' onClick={() => navigate('/forgot-password')} className="login-redirect-button">
          Forgot Password?
        </button>
      </form>
    </div>
  );
}

export default Login;
