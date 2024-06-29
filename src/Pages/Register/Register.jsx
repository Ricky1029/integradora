import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, createUserWithEmailAndPassword, doc, setDoc } from '../../firebaseConfig';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('body-register');

    return () => {
        document.body.classList.remove('body-register');
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        birthday,
      });

      navigate('/login');
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className='register'>
      <h1>Create new Account</h1>
      <p>Already registered? <a href="/login">Login</a></p>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username</label>
        <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label htmlFor="email">Email</label>
        <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password</label>
        <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label htmlFor="birthday">Date of Birth</label>
        <input type="date" name='birthday' value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
