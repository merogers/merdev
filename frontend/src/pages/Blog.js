import React, { useState, useEffect } from "react";

import axios from "axios";

import BlogSnippet from "../components/Blog/BlogSnippet";
import Pagination from "../components/Pagination";

import handleError from "../helpers/handleError";

// --- Blog Component --- //

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);
  const [isLoading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  const getBlogs = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `/api/blog/latest/`,
      });
      setBlogs(response.data);
      setLoading(false);
      console.log(response);
    } catch (error) {
      setLoading(false);
      setErrorState(true);
      handleError(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs && blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Show Loading Message

  if (isLoading) {
    return (
      <div className="container">
        <div className="msg loading">Loading Blogs...</div>
      </div>
    );
  }

  // If fetch fails, show error message to user

  if (errorState) {
    return (
      <div className="container">
        <div className="msg error">Error: could not load blogs</div>
      </div>
    );
  }

  // If no blogs found, show message

  if (blogs === null || blogs.length === 0) {
    return (
      <div className="container">
        <div className="msg loading">No blogs to display</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Latest Blogs</h1>
      {blogs &&
        blogs.map((blog) => {
          const created = new Date(blog.updatedAt);
          const updated = new Date(blog.updatedAt);
          return (
            <BlogSnippet
              blog={blog}
              created={created}
              updated={updated}
              key={blog._id}
              id={blog._id}
            />
          );
        })}
      <Pagination
        blogsPerPage={blogsPerPage}
        totalBlogs={blogs.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Blog;
