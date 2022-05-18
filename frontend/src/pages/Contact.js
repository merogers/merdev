import React, { useState } from "react";

import axios from "axios";

import { NavLink } from "react-router-dom";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const validateContact = () => {
    let regexEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    let valid = true;

    let errors = {};

    if (!values.name.trim()) {
      errors.name = "Name required";
      valid = false;
    }

    // Check for email and valid

    if (!values.email) {
      errors.email = "Email required";
      valid = false;
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Email invalid";
      valid = false;
    }

    // Check message

    if (!values.message.trim()) {
      errors.message = "Message required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleContact = async (url) => {
    try {
      const response = await axios({
        method: "post",
        url: url,
        data: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
        },
      });
      return response;
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateContact()) {
      handleContact("/api/send/sendgrid");
      setIsSubmitted(true);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      {isSubmitted ? (
        <div className="card">
          <h2>Message Sent!</h2>
          <p>Thank you for your inquiry.</p>
          <div className="button-container">
            <NavLink to="/">Back</NavLink>
          </div>
        </div>
      ) : (
        <div className="card">
          <form className="form" onSubmit={handleSubmit}>
            <h2>Contact</h2>
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
              ></input>
              {errors.name && <div className="error">{errors.name}</div>}
            </label>

            <label htmlFor="email">
              Email
              <input
                type="text"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              ></input>
              {errors.email && <div className="error">{errors.email}</div>}
            </label>

            <label htmlFor="phone">
              Phone
              <input
                type="text"
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
              ></input>
              {errors.phone && <div className="error">{errors.phone}</div>}
            </label>

            <label htmlFor="message">
              Message
              <textarea
                id="message"
                name="message"
                onChange={handleChange}
                value={values.message}
              ></textarea>
              {errors.message && <div className="error">{errors.message}</div>}
            </label>
            <div className="submit-container">
              <button type="submit" className="button cta">
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Contact;
