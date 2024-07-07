import React from "react"
import { Routes, Route } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute"
import Dashboard from "../Pages/Dashboard/Dashboard"
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login"
import Register from "../Pages/Register/Register"
import Navbar from "../Navbar"
import DashGarage from "../Pages/Dashboard/DashGarage"
import DashGuests from "../Pages/Dashboard/DashGuests"

const Router = () => {

  return (
    <>
        <Navbar />
        <Routes>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/garage" element={<DashGarage />} />
            <Route path="/guests" element={<DashGuests />} />
        </Routes>
    </>
  )
}

export default Router