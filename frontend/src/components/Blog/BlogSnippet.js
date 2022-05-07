import React, { useContext } from "react";
import { FaReadme, FaEdit, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

// --- Component --- //

const BlogSnippet = ({ blog, created, updated, deleteBlog }) => {
  const [user] = useContext(UserContext);

  return (
    <article className="blog-snippet">
      <h3>{blog.title}</h3>
      <div className="info">
        <div>
          Author: {blog.firstName} {blog.lastName} {blog.email}
        </div>
        <div>Last Updated: {updated.toLocaleDateString()}</div>
      </div>
      <div className="description">{blog.description}</div>
      <div className="button-container">
        <Link className="primary" to={`/blog/${blog.slug}`}>
          <FaReadme />
          Read More
        </Link>
        {blog.user === user._id && (
          <>
            <Link className="cta" to={`/editblog/${blog.slug}`}>
              <FaEdit /> Edit
            </Link>
            <Link
              className="delete"
              to="/dashboard"
              onClick={() => {
                deleteBlog(blog._id);
              }}
            >
              <FaMinus /> Delete
            </Link>
          </>
        )}
      </div>
    </article>
  );
};

export default BlogSnippet;
