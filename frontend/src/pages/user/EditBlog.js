import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";

import { Link, useParams } from "react-router-dom";

const EditBlog = () => {
  const { slug } = useParams();
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

  const handleEditBlog = async (url) => {
    try {
      const response = await axios({
        method: "put",
        url: url,
        data: {
          slug: slug,
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

  const handleGetBlogDetails = useCallback(
    async (url) => {
      try {
        const response = await axios({
          method: "get",
          url: url,
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        setValues({
          title: response.data.title,
          description: response.data.description,
          entry: response.data.entry,
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    [setValues]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateBlog()) {
      handleEditBlog(`blog/${slug}`);
      setIsSubmitted(true);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    handleGetBlogDetails(`blog/${slug}`);
  }, [handleGetBlogDetails, slug]);

  return (
    <div className="container">
      <h1>Edit Blog</h1>

      {isSubmitted ? (
        <div className="card">
          <h3>Post edited successfully!</h3>
          <Link to="/dashboard">Back</Link>
        </div>
      ) : (
        <div className="card">
          <form className="form" onSubmit={handleSubmit}>
            <h2>Edit Blog</h2>
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
            <button className="button cta" type="submit">
              Edit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
