import React, { useState, useContext } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

const CreateBlog = () => {
  const [user] = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState({
    title: "",
    description: "",
    entry: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    entry: "",
  });

  const validateBlog = () => {
    let errors = {};
    let valid = true;

    if (!values.title) {
      errors.title = "Title required";
      valid = false;
    }

    if (!values.description) {
      errors.description = "Description required";
      valid = false;
    }

    if (!values.entry) {
      errors.entry = "Entry required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleCreateBlog = async (url) => {
    try {
      const response = await axios({
        method: "post",
        url: url,
        data: {
          user: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          title: values.title,
          description: values.description,
          entry: values.entry,
        },
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateBlog()) {
      handleCreateBlog("blog/new");
      setIsSubmitted(true);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Create Blog</h1>

      {isSubmitted ? (
        <div className="card">
          <h3>Post created successfully!</h3>
          <Link to="/dashboard">Back</Link>
        </div>
      ) : (
        <div className="card">
          <form className="form" onSubmit={handleSubmit}>
            <h2>Create Blog</h2>
            <label htmlFor="title">
              Title
              <input
                name="title"
                type="text"
                value={values.title}
                onChange={handleChange}
              ></input>
              {errors.title && <div className="error">{errors.title}</div>}
            </label>
            <label htmlFor="description">
              Description
              <input
                name="description"
                type="text"
                value={values.description}
                onChange={handleChange}
              ></input>
              {errors.description && (
                <div className="error">{errors.description}</div>
              )}
            </label>
            <label htmlFor="entry">
              Entry
              <textarea
                name="entry"
                value={values.entry}
                onChange={handleChange}
              ></textarea>
              {errors.entry && <div className="error">{errors.entry}</div>}
            </label>
            <button type="submit">Post</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
