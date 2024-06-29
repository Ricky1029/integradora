import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('body-home');

    return () => {
        document.body.classList.remove('body-home');
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/register');
  }

  return (
    <div className='home'>
      <div className="title">Welcome to Vault-Gate!</div>
      <div className="subtitle">The best option for your family's protection and yours</div>
      <button onClick={handleGetStarted}>Get Started</button>
    </div>
  )
}

export default Home;
