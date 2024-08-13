import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import BarChart from '../../Charts/Bar';

const Dashboard = () => {
  const [username, setUsername] = useState('Usuario');
  const [claveU, setClaveU] = useState(null);
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    // Lógica para obtener la URL de la API según el usuario logueado
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (userData && userData.usuario && userData.usuario.nombre) {
      const nombreU = userData.usuario.nombre;
      const claveUApiUrl = `https://api-mysql-s9hw.onrender.com/usuarios/clave/${nombreU}`;

      // Hacer la solicitud a la API para obtener la claveU
      fetch(claveUApiUrl)
        .then(response => response.json())
        .then(data => {
          if (data && data.claveU) {
            setClaveU(data.claveU);
          } else {
            console.error('Usuario no encontrado o sin claveU');
          }
        })
        .catch(error => console.error('Error al obtener la claveU:', error));

      const invitadosApiUrl = `https://api-mysql-s9hw.onrender.com/invitados/${nombreU}`;
      setApiUrl(invitadosApiUrl);
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
        <h1>Bienvenido {username}{claveU ? ` (Clave: ${claveU})` : ''}</h1>
        <h2>Estas son algunas de tus estadísticas mensuales.</h2>
        {apiUrl && <BarChart apiUrl={apiUrl} />}
      </div>
    </div>
  );
};

export default Dashboard;
