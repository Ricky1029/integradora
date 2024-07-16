import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    document.body.classList.add('body-login');
    return () => {
    document.body.classList.remove('body-login');
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api-mysql-s9hw.onrender.com/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: correoElectronico, contrasena }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('token', 'some-token');
        navigate('/dashboard', { state: { logged: true } });
      } else {
        const errorData = await response.json();
        setMensajeError(errorData.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensajeError('Error al iniciar sesión. Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <div className='login'>
      <h1>Iniciar Sesión</h1>
      <p>Inicia sesión en tu cuenta</p>
      {mensajeError && <p className="error-message">{mensajeError}</p>}
      <form onSubmit={handleLogin}>
        <label htmlFor="correoElectronico">Correo Electrónico</label>
        <input type="email" name='correoElectronico' value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} required />
        <label htmlFor="contrasena">Contraseña</label>
        <input type="password" name='contrasena' value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
