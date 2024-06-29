import './home.css'
import { React, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

  useEffect(() => {
    document.body.classList.add('body-home');

    return () => {
        document.body.classList.remove('body-home');
    };
  }, []);

  return (
    <div className='home'>
      <div className="title">Welcome to Vault-Gate!</div>
      <div className="subtitle">The best option for your family's protection and yours</div>
      <Link to='/register' className='btn'>Get Started</Link>
    </div>
  )
}

export default Home