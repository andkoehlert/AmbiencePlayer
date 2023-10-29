import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './pages/Home';
import Add from './pages/Add';
import Admin from './pages/Admin';
import LogIn from './pages/LogIn';
import SignOut from './pages/SignOut';
import Navbar from './Navbar';
import { auth } from './firebase';

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="flex justify-end pr-20 absolute z-10">
        <Navbar isAuthenticated={!!authUser} />
      </div>
      <div className="container ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/login" element={<LogIn />} />
          {authUser && <Route path="/admin" element={<Admin />} />}
          {authUser && <Route path="/signout" element={<SignOut />} />}
        </Routes>
      </div>
    </>
  );
}

export default App;
