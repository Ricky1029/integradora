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
        <Link to="/dashboard"><img src="src/img/dashboard.png" alt="" />Panel</Link>
        <Link to="/garage"><img src="src/img/puerta.png" alt="" />Garaje</Link>
        <Link to="/guests"><img src="src/img/invitado.png" alt="" />Invitados</Link>
      </div>
      <div className="content">
        <h1>Estado del Garaje</h1>
        <h2>Abierto</h2>
        <div className="garage">
            <img src="src/img/garage abierto.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
