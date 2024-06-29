import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [auth]);

  const navDashboard = (e) => {
    e.preventDefault();

    navigate('/dashboard', {
      replace: true,
      state: {
        logged: true,
      },
    });

    onResetForm();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar">
      {isLoggedIn? (
        <div className='navbar'>
          <div className='navbar__left'>
            <a href='/'><img src="src/img/VAULT.png" alt="" /></a>
          </div>
          <div className='navbar__right'>
            <a href='/'>Home</a>
            <a href='/dashboard' onClick={navDashboard}>Dashboard</a>
            <a href='#' onClick={handleLogout}>Logout</a>
          </div>
        </div>
      ) : (
        <div className='navbar'>
          <div className='navbar__left'>
            <a href='/'><img src="src/img/VAULT.png" alt="" /></a>
          </div>
          <div className='navbar__right'>
            <a href='/'>Home</a>
            <a href='/register'>Register</a>
            <a href='/login'>Login</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;