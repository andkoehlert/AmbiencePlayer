// TestPage.js
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import SignedIn from '../components/SignedIn';
const TestPage = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();

  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authUser) {
    // User is not authenticated, render a message or redirect to login
    return <p>You are not logged in. Please log in to access this page.</p>;
  }

  return (
    <div className="flex justify-end items-end justify-content">
        <SignedIn />
    </div>
    
  );
};

export default TestPage;
