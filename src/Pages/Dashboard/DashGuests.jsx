import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const [invitados, setInvitados] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem('userData'));
    if (userDataFromLocalStorage && userDataFromLocalStorage.usuario && userDataFromLocalStorage.usuario.nombre) {
      setUserData(userDataFromLocalStorage);
      const nombreU = userDataFromLocalStorage.usuario.nombre;
      const apiUrl = `https://api-mysql-s9hw.onrender.com/invitados/${nombreU}`;

      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setInvitados(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const nombreinv = document.getElementById('nombreInvitado').value;
    const codigoa = document.getElementById('codigoAcceso').value;
    const nombreU = userData.usuario ? userData.usuario.nombre : '';

    fetch('https://api-mysql-s9hw.onrender.com/invitados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombreinv, codigoa, nombreU })
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      // Opcionalmente, puedes volver a obtener los datos de los invitados para actualizar la lista
      const apiUrl = `https://api-mysql-s9hw.onrender.com/invitados/${nombreU}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setInvitados(data));
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema al agregar el invitado');
    });

    // actualizar campos a vacio
    document.getElementById('nombreInvitado').value = '';
    document.getElementById('codigoAcceso').value = '';
  };

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
        <h2>Agregar invitados</h2>
        <form onSubmit={handleSubmit}>
          <div className="left">
            <input type="text" placeholder="Nombre del invitado" id='nombreInvitado' required />
            <input type="text" placeholder="Codigo numerico de 4 digitos" id='codigoAcceso' required />
            <input type="text" placeholder="Usuario" id='usuario' hidden value={userData.usuario ? userData.usuario.nombre : ''} disabled />
          </div>
          <div className="right">
            <button type="submit">Agregar invitado</button>
          </div>
        </form>
        <h2>Estas personas son tu invitados</h2>
        <div className="invitados">
          {invitados.map(invitado => (
            <div className="invitado" key={invitado.idinvitado}>
              <img src="src/img/user.png" alt="" />
              <p>Nombre: {invitado.nombreinv}</p>
              <p>Codigo: {invitado.codigoa}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
