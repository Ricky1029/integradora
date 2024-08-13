// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import BarChart from '../../Charts/Bar';

const Dashboard = () => {
  const [username, setUsername] = useState('Usuario');
  const [claveU, setClaveU] = useState(null);  
  const [garageStatus, setGarageStatus] = useState(null);

  useEffect(() => {
    const fetchGarageStatus = async () => {
      try {
        const response = await fetch('https://api-mysql-s9hw.onrender.com/puertaS');
        const data = await response.json();
        const status = data[0]?.status;
        setGarageStatus(status);
      } catch (error) {
        console.error('Error fetching garage status:', error);
      }
    };

    const fetchClaveU = async () => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      
      if (userData && userData.usuario && userData.usuario.nombre) {
        const nombreU = userData.usuario.nombre;
        const claveUApiUrl = `https://api-mysql-s9hw.onrender.com/usuarios/clave/${nombreU}`;

        try {
          const response = await fetch(claveUApiUrl);
          const data = await response.json();
          if (data && data.claveU) {
            setClaveU(data.claveU);
            setUsername(nombreU);
          } else {
            console.error('Usuario no encontrado o sin claveU');
          }
        } catch (error) {
          console.error('Error al obtener la claveU:', error);
        }
      }
    };

    fetchGarageStatus();
    fetchClaveU();

    const intervalId = setInterval(fetchGarageStatus, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='dashboard'>
      <div className="list">
        <Link to="/dashboard"><img src="src/img/dashboard.png" alt="Panel" />Panel</Link>
        <Link to="/garage"><img src="src/img/puerta.png" alt="Garaje" />Garaje</Link>
        <Link to="/guests"><img src="src/img/invitado.png" alt="Invitados" />Invitados</Link>
      </div>
      <div className="content">
        {claveU && (
          <div className="clave-box">
            <h1 className="clave-title">Clave Única: {claveU}</h1>
            <p className="clave-description">
              Esta clave es única y se utiliza para registrar tu rostro dentro del sistema del porton.
            </p>
          </div>
        )}
        <h2>Estado del Garaje</h2>
        <h2>{garageStatus === 0 ? 'Cerrado' : 'Abierto'}</h2>
        <div className="garage">
          <img 
            src={garageStatus === 0 ? 'src/img/garage cerrado.png' : 'src/img/garage abierto.png'} 
            alt={garageStatus === 0 ? 'Garaje Cerrado' : 'Garaje Abierto'} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
