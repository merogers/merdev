import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { UserContext } from "../context/UserContext";

const Login = () => {
  let navigate = useNavigate();

  const [, setUser] = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    login: "",
  });

  // Validate fields

  const validateLogin = () => {
    let regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    let errors = {};
    let valid = true;

    if (!values.email) {
      errors.email = "Email required";
      valid = false;
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Email invalid";
      valid = false;
    }

    if (!values.password) {
      errors.password = "Password required";
      valid = false;
    } else if (values.password.length < 6) {
      errors.password = "Password too short";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleLogin = async (url) => {
    try {
      const response = await axios({
        method: "post",
        url: url,
        data: {
          email: values.email,
          password: values.password,
        },
      });

      const { firstName, lastName, email, token, _id } = response.data.user;
      setUser({ isAuth: true, firstName, lastName, email, _id });
      localStorage.setItem("token", token);
      setIsSubmitted(true);
      return response;
    } catch (error) {
      console.error(error.message);
      setErrors({
        email: "",
        password: "",
        login: "Email or Password Incorrect",
      });
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      navigate("/dashboard");
    }
  });

  // Validate fields and set errors

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateLogin()) {
      handleLogin("user/login");
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="card">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Login</h2>
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
            {errors.password && <div className="error">{errors.password}</div>}
          </label>
          {errors.login && <div className="error">{errors.login}</div>}
          <div className="button-container">
            <button className="button" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
