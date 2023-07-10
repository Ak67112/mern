import React from "react";
import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from './Footer'

export default function Add_employee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    dateOfBirth: "",
    exp: "",
    profile: null,
  });

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/people/${id}`);
      const employeeData = response.data;
      console.log(employeeData)
      setFormData(employeeData);
    } catch (error) {
      console.error("Failed to fetch employee data", error);
      toast.error("Failed to fetch employees");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/people/${id}`, formData);
      console.log("Employee updated successfully");
      toast.success("Updated Successfully");
      navigate("/admin");
    } catch (error) {
      console.error("Failed to update employee", error);
      toast.error("Failed to update employees");
    }
  };

  return (
    <>
      <div className="update_employee">
        <Header />
        <div className="container">
          <div className="top">
            <h3 className="up"> EMPLOYEE UPDATE FORM</h3>

           </div>
          <div className="row">
            <div className="col-lg-6 margin">
              <div class="form-group">
                <label for="formGroupExampleInput">EMPLOYEE NAME</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter The Employee Name"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">DESIGNATION</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter The Employee Designation"
                  name="designation"
                  id="designation"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">DATE OF BIRTH</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Enter The Employee Date Of Birth"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>

             
            </div>
            <div className="col-lg-6 margin">
              
            <div class="form-group">
                <label for="formGroupExampleInput2">Experience</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter The Employee exp"
                  name="exp"
                  id="exp"
                  value={formData.exp}
                  onChange={handleChange}
                />
              </div>

              <div class="form-group">
                <label for="exampleFormControlFile1">PROFILE</label>
                <br />
                <input
                  type="file"
                  class="form-control-file"
                  name="profile"
                  id="profile"
                  onChange={handleFileChange}
                />
              </div>
              
            
              
             
            </div>
          </div>
          <button type="submit" onClick={handleSubmit} class="btn btn-primary submit">
            Update
          </button>
        </div>
      </div>
      <Footer/>
    </>
  );
}
