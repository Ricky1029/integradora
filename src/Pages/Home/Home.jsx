import './home.css'
import { React, useEffect } from 'react'

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
      <button>Get Started</button>
    </div>
  )
}

export default Home