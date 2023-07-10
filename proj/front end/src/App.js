import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home'
import Admin from './Components/Admin'
import Admin_login from './Components/Admin_login'
import Admin_register from './Components/Admin_register'
import Add_employee from './Components/Add_employee'
import Update_Employee from './Components/Update_Employee'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/admin-login' element={<Admin_login />}/>
        <Route path='/admin-register' element={<Admin_register />}/>
        <Route path='/add-employee' element={<Add_employee />}/>
        <Route path='/update-employee/:id' element={<Update_Employee />}/>
    </Routes>
    <ToastContainer />
    </BrowserRouter>
  )
}


