import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const SignUp = ({ isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

// This page is for adding new users to firebase. 

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setSuccessMessage('User signed up successfully!');
        setErrorMessage(''); // Clear any previous error messages
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Error signing up. Please try again.');
        setSuccessMessage(''); // Clear any previous success messages
      });
  };

  if (isAuthenticated) {
    console.log('Not authenticated. Redirecting or showing a message...');

    return <p>You are not authorized to access this page.</p>;
  }

  return (
    <div className="sign-in-container flex justify-content justify-end py-20">
      <form onSubmit={signUp}>
        <h1>Create an account</h1>
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
        <button type="submit">Add user</button>

        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignUp;
