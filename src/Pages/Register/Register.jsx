import { React, useEffect } from 'react'
import './register.css'

const Register = () => {
  
  useEffect(() => {
    document.body.classList.add('body-register');

    return () => {
        document.body.classList.remove('body-register');
    };
}, []);

  return (
    <div className='register'>
        <h1>Create new Account</h1>
        <p>Already registered? <a href="/login">Login</a></p>
        <form>
            <label htmlFor="username">Username</label>
            <input type="text" name='username' />
            <label htmlFor="email">Email</label>
            <input type="email" name='email' />
            <label htmlFor="password">Password</label>
            <input type="password" name='password' />
            <label htmlFor="birthday">Date of Birth</label>
            <input type="date" name='birthday' />
            <button>Register</button>
        </form>
    </div>
  )
}

export default Register
