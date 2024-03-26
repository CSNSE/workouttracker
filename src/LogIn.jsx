import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Ensure your CSS file is imported

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
    <div className="login-container"> {/* Use .login-container for consistent styling */}
      <form onSubmit={handleSubmit} className="login-form"> {/* Use .login-form for the form */}
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="primary-action-button">Log In</button> {/* Styled as primary action */}
        <button type="button" onClick={() => navigate('/signup')} className="login-redirect-button">Don't have an account? Sign Up</button>
      </form>
    </div>
  );
}

export default Login;
