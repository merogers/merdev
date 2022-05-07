import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <h2>Contact Me</h2>
      </div>
      <div>
        <h2>Sitemap</h2>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/">Blog</NavLink>
          </li>
          <li>
            <NavLink to="/">Portfolio</NavLink>
          </li>
          <li>
            <NavLink to="/">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/">Register</NavLink>
          </li>
        </ul>
      </div>
      <div>
        <h2>merogers.dev</h2>
      </div>
    </footer>
  );
};

export default Footer;
