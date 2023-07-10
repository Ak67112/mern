import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';

export default function Update() {
  const navigate = useNavigate()
  return (
    <>
      <div className='header'>
      <h3 onClick={() => navigate('/')}>Beleaf</h3>        
       <button className='logout' onClick={() => navigate('/')}>Logout</button>
      </div>
    </>
  )
}

