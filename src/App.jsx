import { useState } from 'react'
import './App.css'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import Router from './router/Router'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Router />
    </BrowserRouter>
    </>
  )
}

export default App
