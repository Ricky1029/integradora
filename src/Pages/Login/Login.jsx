import { React, useEffect } from 'react'
import './login.css'

const Login = () => {

  useEffect(() => {
    document.body.classList.add('body-login');

    return () => {
        document.body.classList.remove('body-login');
    };
  }, []);

  return (
    <div className='login'>
      <h1>Login</h1>
      <p>Login to your account</p>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name='email' />
        <label htmlFor="password">Password</label>
        <input type="password" name='password' />
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login
