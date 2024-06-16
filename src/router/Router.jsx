import React from "react"
import { Routes, Route } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute"
import Dashboard from "../Pages/Dashboard/Dashboard"
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login"
import Register from "../Pages/Register/Register"
import Navbar from "../Navbar"

const Router = () => {

  return (
    <>
        <Navbar />
        <Routes>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/dashboard" element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            } />
        </Routes>
    </>
  )
}

export default Router