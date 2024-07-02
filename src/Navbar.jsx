// Navbar.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí iría la lógica para verificar si el usuario está logueado
    setIsLoggedIn(true); // Establece esto según sea necesario
  }, []);

  const navDashboard = (e) => {
    e.preventDefault();
    navigate('/dashboard', {
      replace: true,
      state: {
        logged: true,
      },
    });
  };

  const handleLogout = async () => {
    // Aquí iría la lógica para cerrar sesión
    navigate('/login');
  };

  return (
    <div className="navbar">
      {isLoggedIn ? (
        <div className='navbar'>
          <div className='navbar__left'>
            <a href='/'><img src="src/img/VAULT.png" alt="" /></a>
          </div>
          <div className='navbar__right'>
            <a href='/'>Inicio</a>
            <a href='/dashboard' onClick={navDashboard}>Panel</a>
            <a href='#' onClick={handleLogout}>Cerrar Sesión</a>
          </div>
        </div>
      ) : (
        <div className='navbar'>
          <div className='navbar__left'>
            <a href='/'><img src="src/img/VAULT.png" alt="" /></a>
          </div>
          <div className='navbar__right'>
            <a href='/'>Inicio</a>
            <a href='/register'>Registrarse</a>
            <a href='/login'>Iniciar Sesión</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
