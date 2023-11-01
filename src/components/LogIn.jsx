import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Successfully logged in:', userCredential);
        setSuccessMessage('User logged in successfully!');
        setErrorMessage(''); // Clear any previous error messages
        // Redirect to the test page upon successful login
        window.location.href = '/admin'; // Update the path based on your route setup
      })
      .catch((error) => {
        console.error('Login error:', error.message);
        setErrorMessage('Error loggin in. Please try again.');
        setSuccessMessage(''); // Clear any previous success messages
      });
  };

  return (
    <div className="sign-in-container py-20">
      <form onSubmit={handleLogin}>
        <h1>Log In</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default LogIn;
