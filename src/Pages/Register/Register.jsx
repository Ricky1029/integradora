import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('body-register');

    return () => {
      document.body.classList.remove('body-register');
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const nuevoUsuario = {
      nombre: nombreUsuario,
      correo: correoElectronico,
      contrasena: contrasena,
      // Añadir cualquier otro campo necesario aquí, por ejemplo, fecha de nacimiento
    };

    try {
      const response = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (response.ok) {
        // Si la solicitud fue exitosa, navega a la página de inicio de sesión
        navigate('/login');
      } else {
        // Manejar errores de la solicitud
        const errorData = await response.json();
        console.error('Error al registrar el usuario:', errorData);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className='register'>
      <h1>Crear Nueva Cuenta</h1>
      <p>¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a></p>
      <form onSubmit={handleRegister}>
        <label htmlFor="nombreUsuario">Nombre de Usuario</label>
        <input type="text" name='nombreUsuario' value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required />
        <label htmlFor="correoElectronico">Correo Electrónico</label>
        <input type="email" name='correoElectronico' value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} required />
        <label htmlFor="contrasena">Contraseña</label>
        <input type="password" name='contrasena' value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
