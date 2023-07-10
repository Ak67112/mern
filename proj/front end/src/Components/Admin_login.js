import './style1.css';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import React, { useState } from 'react';
import Footer from './Footer'
import { useNavigate } from 'react-router-dom';
export default function Admin_login() {
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    loginEmail: '',
    loginPassword: '',
  });



  const [formErrors, setFormErrors] = useState({});

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

 

  const validateLoginForm = () => {
    let isValid = true;
    const errors = {};

    if (!loginFormData.loginEmail) {
      errors.loginEmail = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginFormData.loginEmail)) {
      errors.loginEmail = 'Invalid email format';
      isValid = false;
    }

    if (!loginFormData.loginPassword) {
      errors.loginPassword = 'Password is required';
      isValid = false;
    } else if (loginFormData.loginPassword.length < 6) {
      errors.loginPassword = 'Password should be at least 6 characters long';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

 

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    
    const isValid = validateLoginForm();

    if (isValid) {
      const { loginEmail, loginPassword } = loginFormData;

      const postData = {
        email: loginEmail,
        password: loginPassword,
      };

      try {
        const response = await axios.post('http://localhost:5000/api/user/login', postData);
        console.log('Logged in successfully', response.data);
        toast.success('Logged in successfully');

        navigate('/admin');
        
      } catch (error) {
        console.error('Failed to login', error);
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          loginEmail: 'Invalid email or password',
        }));
      }
    } else {
      console.log('Login form validation failed');
    }
  };

  

  return (
    <>
      <div className='Admin_login body'>
        <div className="main">
          <div >
            <form>
            <h1 className='lo'>LOGIN FORM</h1>
            
              <input
                type="email"
                placeholder="Email"
                className='input1'
                name="loginEmail"
                value={loginFormData.loginEmail}
                onChange={handleLoginChange}
              />
              {formErrors.loginEmail && (
                <p className="dataerror1">{formErrors.loginEmail}</p>
              )}<br/>

              <input
                type="password"
                placeholder="Password"
                className='input1'
                name="loginPassword"
                value={loginFormData.loginPassword}
                onChange={handleLoginChange}
              />
              {formErrors.loginPassword && (
                <p className="dataerror1">{formErrors.loginPassword}</p>
              )}

<div className="button-container">
  <button className='button1' onClick={handleLoginSubmit}>Login</button><br/><br/>
  <button onClick={() => navigate("/")} alt="undo">BACK</button><br/><br/>
  <button onClick={() => navigate("/admin-register")} alt="undo">
    Don't have an account?
  </button>



</div>


            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

