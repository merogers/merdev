import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleRegister = async (route) => {
    try {
      const response = await axios({
        method: "post",
        url: route,
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
      });
      return response;
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateRegister()) {
      handleRegister("user/register");
      setIsSubmitted(true);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateRegister = () => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    let errors = {};
    let valid = true;

    // Check first name

    if (!values.firstName.trim()) {
      errors.firstName = "First name required";
      valid = false;
    }

    // Check for last name

    if (!values.lastName.trim()) {
      errors.lastName = "Last name required";
      valid = false;
    }

    // Check for email and valid

    if (!values.email) {
      errors.email = "Email required";
      valid = false;
    } else if (!regex.test(values.email)) {
      errors.email = "Email invalid";
      valid = false;
    }

    // Check password and length more than 6 chars

    if (!values.password) {
      errors.password = "Password required";
      valid = false;
    } else if (values.password.length < 6) {
      errors.password = "Password too short";
      valid = false;
    }

    // Check if confirm password and passwords match

    if (!values.password2) {
      errors.password2 = "Password required";
      valid = false;
    } else if (values.password2 !== values.password) {
      errors.password2 = "Passwords do not match";
      valid = false;
    }

    // Return known errors
    setErrors(errors);
    return valid;
  };

  return (
    <div className="container">
      {isSubmitted ? (
        <div className="msg">
          <h2>Registration Successful!</h2>
          <NavLink to="/login">
            <button classname="button cta">Login</button>
          </NavLink>
        </div>
      ) : (
        <div className="card">
          <form onSubmit={handleSubmit} className="form">
            <h2>Register</h2>
            <label htmlFor="firstName">
              First Name
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
              ></input>
              {errors.firstName && (
                <div className="error">{errors.firstName}</div>
              )}
            </label>
            <label htmlFor="lastName">
              Last Name
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              ></input>
              {errors.lastName && (
                <div className="error">{errors.lastName}</div>
              )}
            </label>
            <label htmlFor="email">
              Email Address
              <input
                type="text"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              ></input>
              {errors.email && <div className="error">{errors.email}</div>}
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              ></input>
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </label>
            <label htmlFor="password2">
              Confirm Password
              <input
                type="password"
                id="password2"
                name="password2"
                value={values.password2}
                onChange={handleChange}
              ></input>
              {errors.password2 && (
                <div className="error">{errors.password2}</div>
              )}
            </label>
            <div className="button-container">
              <button className="button primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
