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
        .then(data => {
          setInvitados(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, []);

  const generateRandomCode = () => {
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += Math.floor(Math.random() * 4) + 1; // Genera un número aleatorio entre 1 y 4
    }
    return code;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const nombreinv = document.getElementById('nombreInvitado').value;
    const codigoa = generateRandomCode();
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
        .then(data => {
          setInvitados(data);
        });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema al agregar el invitado');
    });
  };

  const handleDelete = (idinvitado) => {
    const nombreU = userData.usuario ? userData.usuario.nombre : '';

    fetch(`https://api-mysql-s9hw.onrender.com/invitados/${idinvitado}`, {
      method: 'DELETE'
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      // Vuelve a obtener los datos de los invitados para actualizar la lista
      const apiUrl = `https://api-mysql-s9hw.onrender.com/invitados/${nombreU}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          setInvitados(data);
        });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema al eliminar el invitado');
    });
  };

  return (
    <div className='dashboard'>
      <div className="list">
        <Link to="/dashboard"><img src="src/img/dashboard.png" alt="" />Panel</Link>
        <Link to="/garage"><img src="src/img/puerta.png" alt="" />Garaje</Link>
        <Link to="/guests"><img src="src/img/invitado.png" alt="" />Invitados</Link>
      </div>
      <div className="content">
        <h1>Invitados</h1>
        <h2>Agregar invitados</h2>
        <form onSubmit={handleSubmit}>
          <div className="left">
            <input type="text" placeholder="Nombre del invitado" id='nombreInvitado' required />
            <input type="text" placeholder="Codigo numerico de 4 digitos" id='codigoAcceso' hidden value={generateRandomCode()} disabled />
            <input type="text" placeholder="Usuario" hidden id='usuario' value={userData.usuario ? userData.usuario.nombre : ''} disabled />
          </div>
          <div className="right">
            <button type="submit">Agregar invitado</button>
          </div>
        </form>
        <h2>Estas personas son tus invitados</h2>
        <div className="invitados">
          {invitados.map(invitado => (
            <div className="invitado" key={invitado.idinvitado}>
              <img src="src/img/user.png" alt="" />
              <p>Nombre: {invitado.nombreinv}</p>
              <p>Codigo: {invitado.codigoa}</p>
              <button onClick={() => handleDelete(invitado.idinvitado)}>Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
