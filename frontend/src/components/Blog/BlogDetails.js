import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

import { UserContext } from "../../context/UserContext";

const BlogDetails = ({ blog }) => {
  const [user] = useContext(UserContext);
  const created = new Date(blog.createdAt);
  const updated = new Date(blog.updatedAt);
  return (
    <article className="blog-details">
      <h3>{blog.title}</h3>
      <div className="info">
        <div>
          Author: {blog.firstName} {blog.lastName}
        </div>
        <div>Last Updated: {updated.toLocaleDateString()}</div>
      </div>
      <div className="entry">{blog.entry}</div>
      <div className="button-container">
        <Link
          className="button primary"
          to={user.isAuth ? "/dashboard" : "/blog"}
        >
          <FaArrowLeft /> Back
        </Link>
      </div>
    </article>
  );
};

export default BlogDetails;
