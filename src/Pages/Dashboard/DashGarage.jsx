// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import BarChart from '../../Charts/Bar';

const Dashboard = () => {
  const [username, setUsername] = useState('Usuario');
  const [garageStatus, setGarageStatus] = useState(null);

  useEffect(() => {
    // Lógica para obtener el estado de la puerta desde la API
    const fetchGarageStatus = async () => {
      try {
        const response = await fetch('https://api-mysql-s9hw.onrender.com/puertaS');
        const data = await response.json();
        console.log('Data from API:', data); // Verifica los datos recibidos

        // Accediendo al primer objeto del array y obteniendo el status
        const status = data[0]?.status;
        setGarageStatus(status);
      } catch (error) {
        console.error('Error fetching garage status:', error);
      }
    };

    fetchGarageStatus();
  }, []);

  return (
    <div className='dashboard'>
      <div className="list">
        <Link to="/dashboard"><img src="src/img/dashboard.png" alt="Panel" />Panel</Link>
        <Link to="/garage"><img src="src/img/puerta.png" alt="Garaje" />Garaje</Link>
        <Link to="/guests"><img src="src/img/invitado.png" alt="Invitados" />Invitados</Link>
      </div>
      <div className="content">
        <h1>Estado del Garaje</h1>
        <h2>{garageStatus === 1 ? 'Cerrado' : 'Abierto'}</h2>
        <div className="garage">
          <img 
            src={garageStatus === 1 ? 'src/img/garage cerrado.png' : 'src/img/garage abierto.png'} 
            alt={garageStatus === 1 ? 'Garaje Cerrado' : 'Garaje Abierto'} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
