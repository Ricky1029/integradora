import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const [invitados, setInvitados] = useState([]);
  const [userData, setUserData] = useState({}); // Define userData as a state variable

  useEffect(() => {
    // Obtener datos del usuario desde localStorage
    const userDataFromLocalStorage = JSON.parse(localStorage.getItem('userData'));
    if (userDataFromLocalStorage && userDataFromLocalStorage.usuario && userDataFromLocalStorage.usuario.nombre) {
      setUserData(userDataFromLocalStorage); // Update userData state
      const nombreU = userDataFromLocalStorage.usuario.nombre; 
      // Construir la URL de la API de invitados con el nombreU
      console.log("nombre"+nombreU)
      const apiUrl = `https://api-mysql-s9hw.onrender.com/invitados/${nombreU}`;

      // Realizar la solicitud GET a la API
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
        <form>
          <div className="left">
            <input type="text" placeholder="Nombre del invitado" id='nombreInvitado'/>
            <input type="text" placeholder="Codigo numerico de 4 digitos" id='codigoAcceso'/>
            {/* agrega un campo no modificable donde se muestre el usuario iniciado sesion */}
            <p>Usuario Agregando Invitados</p>
            <input type="text" placeholder="Usuario" id='usuario' value={userData.usuario ? userData.usuario.nombre : ''} disabled/>
          </div>
          <div className="right">
            <button>Agregar invitado</button>
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