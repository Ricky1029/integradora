// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import BarChart from '../../Charts/Bar';

const Dashboard = () => {
  const [username, setUsername] = useState('Usuario');

  useEffect(() => {
    // Aquí iría la lógica para obtener los datos del usuario
  }, []);

  return (
    <div className='dashboard'>
      <div className="list">
        <Link to="/"><img src="src/img/dashboard.png" alt="" />Panel</Link>
        <Link to="/"><img src="src/img/puerta.png" alt="" />Garaje</Link>
        <Link to="/"><img src="src/img/invitado.png" alt="" />Invitados</Link>
      </div>
      <div className="content">
        <div className="top">
          <div className="left">
            <img src="src/img/VAULT.png" alt="" className='vault' />
          </div>
          <div className="right">
            <img src="src/img/campana.png" alt="" className='campana' />
            <img src="src/img/user.png" alt="" className='user'/>
          </div>
        </div>
        <h1>Bienvenido, {username}!</h1>
        <h2>Estas son algunas de tus estadísticas mensuales.</h2>
        <BarChart />
      </div>
    </div>
  );
};

export default Dashboard;
