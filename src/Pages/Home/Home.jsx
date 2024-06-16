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
    <div className='home'>Home</div>
  )
}

export default Home