import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false); // Estado para mostrar u ocultar el menú

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
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

  const handleLogout = () => {
    // Cerrar sesión, eliminar token y datos del usuario de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="navbar">
      {isLoggedIn ? (
        <div className="navbar">
          <div className="navbar__left">
            <a href="/"><img src="src/img/VAULT.png" alt="Logo" /></a>
          </div>
          <div className="navbar__right">
            <a href="/">Inicio</a>
            <a href="/dashboard" onClick={navDashboard}>Panel</a>
            <a href="#" onClick={handleLogout}>Cerrar Sesión</a>
          </div>
          <div className="navbar__hamburger">
            <button onClick={handleToggleMenu}>
              <span>Menu</span>
            </button>
            {showMenu && (
              <div className="navbar__menu">
                <a href="/">Inicio</a>
                <a href="/dashboard" onClick={navDashboard}>Panel</a>
                <a href="#" onClick={handleLogout}>Cerrar Sesión</a>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="navbar">
          <div className="navbar__left">
            <a href="/"><img src="src/img/VAULT.png" alt="Logo" /></a>
          </div>
          <div className="navbar__right">
            <a href="/">Inicio</a>
            <a href="/register">Registrarse</a>
            <a href="/login">Iniciar Sesión</a>
          </div>
          <div className="navbar__hamburger">
            <button onClick={handleToggleMenu}>
              <i className="fas fa-bars"></i>
            </button>
            {showMenu && (
              <div className="navbar__menu">
                <a href="/">Inicio</a>
                <a href="/register">Registrarse</a>
                <a href="/login">Iniciar Sesión</a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;