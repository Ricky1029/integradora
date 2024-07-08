import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const navigate = useNavigate();

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
        console.log('Datos del usuario recibidos:', userData); // Verifica los datos del usuario en la consola
        localStorage.setItem('userData', JSON.stringify(userData)); // Guarda los datos del usuario como cadena JSON
        localStorage.setItem('token', 'some-token'); // Simula el almacenamiento del token
        console.log('Datos del usuario guardados en localStorage:', userData); // Verifica el éxito al guardar en localStorage
        navigate('/dashboard');
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
