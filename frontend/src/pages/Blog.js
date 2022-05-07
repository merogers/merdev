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
  const [isLoading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);

  const getBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: `/api/blog/latest`,
      });
      setBlogs(response.data);
      setLoading(false);
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
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const Blogs = ({ blogs, isLoading }) => {
    if (isLoading) {
      return <div className="msg loading" msg="Loading Blogs..." />;
    }

    return blogs.map((blog) => {
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
    });
  };

  return (
    <div className="container">
      <h1>Latest Blogs</h1>
      <Blogs blogs={currentBlogs} isLoading={isLoading} />
      {blogs.length > 0 && (
        <Pagination
          blogsPerPage={blogsPerPage}
          totalBlogs={blogs.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
      {errorState && (
        <div className="msg error">Error: could not load blogs</div>
      )}
      {blogs.length === 0 && <div className="msg">No blogs to display...</div>}
    </div>
  );
};

export default Blog;
