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
        <div className="top">
          <div className="left">
            <img src="src/img/VAULT.png" alt="" className='vault' />
          </div>
          <div className="right">
            <img src="src/img/campana.png" alt="" className='campana' />
            <img src="src/img/user.png" alt="" className='user'/>
          </div>
        </div>
        <h1>Invitados</h1>
        <h2>Estas personas son tu invitados</h2>
        <div className="invitados">
            <div className="invitado">
                <img src="src/img/user.png" alt="" />
                <p>Nombre: Invitado 1</p>
                <p>Codigo: 123</p>
            </div>
            <div className="invitado">
                <img src="src/img/user.png" alt="" />
                <p>Nombre: Invitado 2</p>
                <p>Codigo: 456</p>
            </div>
            <div className="invitado">
                <img src="src/img/user.png" alt="" />
                <p>Nombre: Invitado 3</p>
                <p>Codigo: 789</p>
            </div>
            <div className="invitado">
                <img src="src/img/user.png" alt="" />
                <p>Nombre: Invitado 4</p>
                <p>Codigo: 101</p>
            </div>
            <div className="invitado">
                <img src="src/img/user.png" alt="" />
                <p>Nombre: Invitado 5</p>
                <p>Codigo: 101</p>
            </div>
            <div className="invitado">
                <img src="src/img/user.png" alt="" />
                <p>Nombre: Invitado 6</p>
                <p>Codigo: 101</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
