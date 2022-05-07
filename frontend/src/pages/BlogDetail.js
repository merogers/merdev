import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import BlogDetails from "../components/Blog/BlogDetails";

const BlogDetail = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const getBlog = async () => {
        setLoading(true);
        const response = await axios({
          method: "GET",
          url: `/api/blog/${slug}`,
        });
        setBlog(response.data);
        setLoading(false);
      };
      getBlog();
    } catch {
      setError(true);
    }
  }, [slug]);

  return (
    <div className="container">
      <h1>View Full Blog</h1>
      {isLoading && <div className="msg loading" msg="Loading..." />}
      {error && <div className="msg error">Error Loading blog</div>}
      {blog && <BlogDetails blog={blog} />}
    </div>
  );
};

export default BlogDetail;
