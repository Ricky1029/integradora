import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import BarChart from '../../Charts/Bar';

const Dashboard = () => {
  const [username, setUsername] = useState('Usuario');
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    // Lógica para obtener la URL de la API según el usuario logueado
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (userData && userData.usuario && userData.usuario.nombre) {
      const nombreU = userData.usuario.nombre;
      const apiUrl = `https://api-mysql-s9hw.onrender.com/invitados/${nombreU}`;
      setApiUrl(apiUrl);
      setUsername(nombreU);
    }
  }, []);

  return (
    <div className='dashboard'>
      <div className="list">
        <Link to="/dashboard"><img src="src/img/dashboard.png" alt="" />Panel</Link>
        <Link to="/garage"><img src="src/img/puerta.png" alt="" />Garaje</Link>
        <Link to="/guests"><img src="src/img/invitado.png" alt="" />Invitados</Link>
      </div>
      <div className="content">
        <h1>Bienvenido {username}!</h1>
        <h2>Estas son algunas de tus estadísticas mensuales.</h2>
        {apiUrl && <BarChart apiUrl={apiUrl} />}
      </div>
    </div>
  );
};

export default Dashboard;
