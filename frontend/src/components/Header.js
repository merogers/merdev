import React from "react";

import { NavLink } from "react-router-dom";

import Nav from "./Nav";

import Logo from "../assets/logo.png";

// --- Component --- //

const Header = ({ title }) => {
  return (
    <header className="header">
      <NavLink to="/" className="logo-navlink">
        <img src={Logo} alt="Logo" />
        <span>{title}</span>
      </NavLink>
      <Nav />
    </header>
  );
};

export default Header;
