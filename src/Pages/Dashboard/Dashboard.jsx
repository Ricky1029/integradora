import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db, doc, getDoc } from '../../firebaseConfig';
import './dashboard.css';

const Dashboard = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className='dashboard'>
      <div className="list">
        <Link to="/"><img src="src/img/dashboard.png" alt="" />Dashboard</Link>
        <Link to="/"><img src="src/img/puerta.png" alt="" />Garage</Link>
        <Link to="/"><img src="src/img/invitado.png" alt="" />Guests</Link>
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
        <h2>Estas son algunas de tus estadisticas semanales.</h2>
      </div>
    </div>
  );
};

export default Dashboard;
