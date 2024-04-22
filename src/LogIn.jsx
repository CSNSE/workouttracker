import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';

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
        {error && <h6 className='Error'>{error}</h6>}
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

        <button type='button' onClick={() => navigate('/forgot-password')} className="login-redirect-button">
          Forgot Password?
        </button>

        <button onClick={() => navigate('/signup')} className="login-redirect-button">
          Don't have an account? Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;
