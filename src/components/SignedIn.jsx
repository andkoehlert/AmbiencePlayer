import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }

      setLoading(false); // Update loading state when authentication state is determined
    });

    return () => unsubscribe(); // Unsubscribe when the component unmounts

  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('signed out');
      })
      .catch((error) => console.log(error));
  };

  if (loading) {
    return <p>Loading...</p>; // You can show a loading indicator while the authentication state is being determined
  }

  return (
    <div>
      {authUser ? (
        <>
        <form className="py-20">
            
          <p>{`Signed in as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
          </form>

        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;
