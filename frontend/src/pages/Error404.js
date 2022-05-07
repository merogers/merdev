import React from "react";

import { NavLink } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="container">
      <div className="card">
        <h2>Error 404</h2>
        <p>Page cannot be found</p>
        <div className="button-container">
          <NavLink to="/">Home</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Error404;
