import './style1.css';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import React, { useState } from 'react';
import Back from './images/undo.png';
import Footer from './Footer'
import { useNavigate } from 'react-router-dom';
export default function Admin_login() {
  const navigate = useNavigate();

 

  const [registerFormData, setRegisterFormData] = useState({
    registerName: '',
    registerEmail: '',
    registerPassword: '',
  });

  const [formErrors, setFormErrors] = useState({});


  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Clear the corresponding error message when input value changes
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

 

  const validateRegisterForm = () => {
    let isValid = true;
    const errors = {};

    if (!registerFormData.registerName) {
      errors.registerName = 'Name is required';
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(registerFormData.registerName)) {
      errors.registerName = 'Name should contain only alphabets';
      isValid = false;
    }

    if (!registerFormData.registerEmail) {
      errors.registerEmail = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(registerFormData.registerEmail)) {
      errors.registerEmail = 'Invalid email format';
      isValid = false;
    }

    if (!registerFormData.registerPassword) {
      errors.registerPassword= "Field cannot be blank";
      isValid = false;
    } else {
       if (
        registerFormData.registerPassword.length < 5 ||
        registerFormData.registerPassword.length > 21
      ) {
        errors.registerPassword = "Password should be between 5 and 21 characters";
        isValid = false;
      } else if (!registerFormData.registerPassword.match(/[a-z]/g)) {
        errors.registerPassword = "Please enter at least one lowercase";
        isValid = false;
      } else if (!registerFormData.registerPassword.match(/[A-Z]/g)) {
        errors.registerPassword = "Please enter at least one uppercase";
        isValid = false;
      } 
      else if (!registerFormData.registerPassword.match(/[0-9]/g)) {
        errors.registerPassword = "Please enter at least one digit";
        isValid = false;
      } 
    }

    setFormErrors(errors);
    return isValid;
  };


  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Validate register form
    const isValid = validateRegisterForm();

    if (isValid) {
      const { registerName, registerEmail, registerPassword } = registerFormData;

      const postData = {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      };

      try {
        await axios.post('http://localhost:5000/api/user/register', postData);
        console.log('Person added successfully');
        toast.success('User added Successfully');

        // Reset form
        setRegisterFormData({
          registerName: '',
          registerEmail: '',
          registerPassword: '',
        });
      } catch (error) {
        console.error('Failed to add person', error);
        toast.error('Failed to add User');
      }
    } else {
      console.log('Register form validation failed');
    }
  };

  return (
    <>
      <div className='Admin_login body'>
        <div className="main">
         
          <div>
            <form>
            <h1 className='lo'>REGISTER FORM</h1>
              <input
                type="text"
                placeholder="User name"
                className='input1'
                name="registerName"
                value={registerFormData.registerName}
                onChange={handleRegisterChange}
              />
              {formErrors.registerName && (
                <p className="dataerror1">{formErrors.registerName}</p>
              )} 
              <input
                type="email"
                placeholder="Email"
                className='input1'
                name="registerEmail"
                value={registerFormData.registerEmail}
                onChange={handleRegisterChange}
              />
              {formErrors.registerEmail && (
                <p className="dataerror1">{formErrors.registerEmail}</p>
              )}

              <input
                type="password"
                placeholder="Password"
                className='input1'
                name="registerPassword"
                value={registerFormData.registerPassword}
                onChange={handleRegisterChange}
              />
              {formErrors.registerPassword && (
                <p className="dataerror1">{formErrors.registerPassword}</p>
              )}

<div className="button-container">
  <button className='button1' onClick={handleRegisterSubmit}>Sign up</button><br/><br/>
  <button className='button1' onClick={() => navigate("/")} alt="undo">BACK</button><br/><br/>
  <button className='button1' onClick={() => navigate("/admin-login")} alt="undo">Go TO Login</button>
</div>

            </form>
          </div>

          
        </div>
      </div>
      <Footer/>
    </>
  );
}

