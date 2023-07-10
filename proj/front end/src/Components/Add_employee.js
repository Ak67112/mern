import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./style.css";
import { useState } from "react";
import axios from "axios";

export default function Add_employee() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    dateOfBirth: "",
    exp: "",
    profile: "",
    document: null,
    terms: false,
  });

  const [formErrors, setFormErrors] = useState({});
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
  const handleDocumentChange = (event) => {
    const documentFile = event.target.files[0];
    setFormData({ ...formData, document: documentFile });
  };
  const validateForm = () => {
    let isValid = true;
    const errors = { ...formErrors };

    if (!formData.name) {
      errors.name = "Name is required";
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(formData.name)) {
      errors.name = "Name should contain only alphabets";
      isValid = false;
    }


    if (!formData.designation) {
      errors.designation = "designation is required";
      isValid = false;
    }

    const isDateBeforeToday = (dateString) => {
      const enteredDate = new Date(dateString);
      const today = new Date();

      if (isNaN(enteredDate) || enteredDate > today) {
        return "Please enter a valid date before today.";
      }
    };

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Please enter a date.";
      isValid = false;
    } else {
      const dateError = isDateBeforeToday(formData.dateOfBirth);
      if (dateError) {
        errors.dateOfBirth = dateError;
        isValid = false;
      }
    }

    if (!formData.exp) {
      errors.exp = "Experience is required";
      isValid = false;
    }


    if (!formData.terms) {
      errors.terms = "terms is required";
      isValid = false;
    }

    if (!formData.profile) {
      errors.profile = "Please upload your profile";
      isValid = false;
    } else if (!/(\.jpg|\.jpeg|\.png)$/i.test(formData.profile.name)) {
      errors.profile = "File should be a jpg or a png";
      isValid = false;
    }

    if (!formData.document) {
      errors.document = 'Document file is required';
    } else {
      const allowedExtensions = ['pdf', 'doc', 'docx'];
      const fileExtension = formData.document.name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        errors.document = 'Only PDF and DOC/DOCX files are allowed';
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const isValid = validateForm();

    if (isValid) {
      const {
        name,
        designation,
        dateOfBirth,
        exp,
        profile,
        terms,
      } = formData;
   
      const postData = new FormData();
      postData.append("name", name);
      postData.append("designation", designation);
      postData.append("dateOfBirth", dateOfBirth);
      postData.append("exp", exp);
      postData.append("profile", profile);

      try {
        await axios.post("http://localhost:5000/api/people", postData);
        console.log("Person added successfully");
        toast.success("Employee added successfully");
        navigate("/admin");
       
        setFormData({
          name: "",
          designation: "",
          dateOfBirth: "",
          exp: "",
          profile: "",
        });
      } catch (error) {
        console.error("Failed to add person", error);
        toast.error("Failed to add Employee");
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <>
      <div className="Add_employee">
        <Header />
        <div className="container">
          <div className="top">
            <h3> EMPLOYEE FORM</h3>
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
                {formErrors.name && (
                  <span className="dataerror">{formErrors.name}</span>
                )}
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
                {formErrors.designation && (
                  <span className="dataerror">{formErrors.designation}</span>
                )}
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">DATE OF BIRTH</label>
                <input
                  type="date"
                  class="form-control"
                  placeholder="Enter The Employee Date Of Birth"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
                {formErrors.dateOfBirth && (
                  <span className="dataerror">{formErrors.dateOfBirth}</span>
                )}
              </div>
            </div>
            <div className="col-lg-6 margin">
            <div class="form-group">
                <label for="formGroupExampleInput2">EXPERIENCE</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter The Employee Experience"
                  name="exp"
                  id="exp"
                  value={formData.exp}
                  onChange={handleChange}
                />
                {formErrors.exp && (
                  <span className="dataerror">{formErrors.exp}</span>
                )}
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
                /><br/>
                {formErrors.profile && (
                  <span className="dataerror">{formErrors.profile}</span>
                )}
              </div>
              <div class="form-group">
              <label>DOCUMENT</label><br/>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          name="document"
          onChange={handleDocumentChange}
        /><br/>
        {formErrors.document && <span className="dataerror">{formErrors.document}</span>}
        </div></div>
          </div>
          <div class="form-check tick">
            <input
              type="checkbox"
              class="form-check-input"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            <label class="form-check-label" for="exampleCheck1">
              terms&conditions
            </label><br/>
            {formErrors.terms && (
              <span className="dataerror">{formErrors.terms}</span>
            )}
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            class="btn btn-primary submit"
          >
            Add Employee
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
