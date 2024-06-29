import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../../firebaseConfig';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('body-login');

    return () => {
        document.body.classList.remove('body-login');
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className='login'>
      <h1>Login</h1>
      <p>Login to your account</p>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password</label>
        <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
