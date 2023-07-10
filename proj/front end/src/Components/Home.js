import React from 'react'
import './style.css'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate()
  return (
    <>
      <div className='home-body'>
        <div className='homename'>
            <h3>Beleaf</h3>
        <h2>
          LET US <br/> <span className='span'>JOIN!</span>
        </h2>
        </div>

       <button className='button' onClick={() => navigate('/admin-login')}>Get Started</button>
       
      </div>
     <Footer/>
     
    </>
  )
}

b