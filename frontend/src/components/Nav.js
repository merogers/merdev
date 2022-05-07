import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "../context/UserContext";

import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

// --- Component --- //

const Nav = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const [user] = useContext(UserContext);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    // Gets new width
    window.addEventListener("resize", handleResize);
    // Cleanup Function
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Navigation = () => {
    const links = [
      {
        title: "Home",
        path: "/",
      },
      {
        title: "Blog",
        path: "/blog",
      },
      {
        title: "Portfolio",
        path: "/portfolio",
      },
      {
        title: "Contact",
        path: "/contact",
      },
      {
        title: "Register",
        path: "/register",
      },
    ];

    return (
      <>
        {links.map((link, idx) => (
          <li key={idx}>
            <NavLink to={link.path}>{link.title}</NavLink>
          </li>
        ))}
        {!user.isAuth && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </>
    );
  };

  const NavBar = ({ Navigation }) => {
    return (
      <div className="navbar">
        <Navigation />
      </div>
    );
  };

  const SideBar = ({ Navigation }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    function toggleMenu() {
      setMenuOpen(!menuOpen);
    }
    return (
      <div className={`sidebar ${menuOpen ? "active" : ""}`}>
        <div className="toggle" onClick={toggleMenu}>
          {menuOpen ? <AiOutlineClose /> : <FaBars />}
        </div>
        <div className="sidebar-links" onClick={toggleMenu}>
          <Navigation />
        </div>
      </div>
    );
  };

  // If width < 700 use sidebar
  return (
    <nav className="nav">
      {width > 700 ? (
        <NavBar Navigation={Navigation} />
      ) : (
        <SideBar Navigation={Navigation} />
      )}
    </nav>
  );
};

export default Nav;
