import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Successfully logged in:', userCredential);
        // Redirect to the test page upon successful login
        window.location.href = '/admin'; // Update the path based on your route setup
      })
      .catch((error) => {
        console.error('Login error:', error.message);
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
      </form>
    </div>
  );
};

export default LogIn;
