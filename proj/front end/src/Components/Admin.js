import React from "react";
import './style.css'
import Footer from './Footer'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Header from "./Header";


export default function Admin() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/people');
      setEmployees(response.data);
    } catch (error) {
      console.error('Failed to fetch employees', error);
      toast.error('Failed to fetch employees');
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/people/${employeeId}`);

      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== employeeId));
      console.log('Employee deleted successfully');
      toast.error("Employee deleted successfully");
      navigate('/admin')
    } catch (error) {
      console.error('Failed to delete employee', error);
      toast.error('Failed to delete employee');
    }
  };

  return (
    <>
      <div className="Admin">
        <Header />
        

        <div className="container">
          <div className="employee_data">
            <h4>DASHBOARD</h4>
          <button className="adminbtn" onClick={() => navigate("/add-employee")} >Add Employee </button>
          </div>
          {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (

          <table>

            <thead className="text-center">
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Experience</th>
                <th>Designation</th>
                <th>Date Of Birth</th>
                <th>Action</th>
              </tr>  
            </thead>
            <hr/>

            <tbody className="text-center">
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td><img src={`http://localhost:5000/${employee.profile}`} style={{ width: '100px', height: '100px' }} alt="Profile" /></td>
                <td>{employee.name}</td>
                <td>{employee.exp}</td>
                <td>{employee.designation}</td>
                <td>
                {employee.dateOfBirth}
                </td>
                <td className="Action">
                <button className="del" onClick={() => handleDelete(employee._id)} alt="delete">Delete</button>
                <button className="upd" onClick={() => navigate(`/update-employee/${employee._id}`)} alt="Update" >Update</button>
                </td>

              </tr>
            ))}
            </tbody>
          </table>
      )}
        </div>
      </div>
      <Footer/>
    </>
  );
}
