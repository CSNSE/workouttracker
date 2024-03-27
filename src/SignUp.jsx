import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Auth.css'; // Assuming your styles are defined here

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log('User created:', user);
        // Redirect or update UI, for example, navigate to the home page
        navigate('/'); // Adjust as needed, for example, navigate to a dashboard
      })
      .catch((error) => {
        console.error('Error signing up:', error.message);
        if (error.message='Firebase: Error (auth/email-already-in-use).'){
            setError('This email address is already in use.')
        }
    });
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Navigate to the login page
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
        <button type="button" onClick={handleLoginRedirect} className="login-redirect-button">
          Already have an account? Log In
        </button>
      </form>
    </div>
  );
  
}

export default SignUp;
