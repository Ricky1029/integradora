import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = true
  const navigate = useNavigate();

  const navDashboard = e => {
    e.preventDefault();

    navigate('/dashboard',{
        replace: true,
        state: {
            logged: true,
        },
    });

    onResetForm();
  };

  return (
    <div className="navbar">
      {isLoggedIn ? (
        <div className='navbar'>
        <div className='navbar__left'>
          <a href='/'><img src="src/img/VAULT.png" alt="" /></a>
        </div>
        <div className='navbar__right'>
          <a href='/'>Home</a>
          <a href='/dashboard' onClick={navDashboard}>Dashboard</a>
          <a href='/login'>Logout</a>
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