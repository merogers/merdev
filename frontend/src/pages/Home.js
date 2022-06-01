import React from "react";

import { NavLink } from "react-router-dom";

import {
  FaGithub,
  FaLinkedinIn,
  FaFilePdf,
  FaFolderOpen,
} from "react-icons/fa";

import profile from "../assets/profile.png";

// --- Component --- //

const Home = () => {
  return (
    <div className="container">
      <div className="hero">
        <div className="hero-section">
          <h1>
            Hi, I'm Michelle, and I'm a{" "}
            <span className="emphasis">Full-Stack Web Developer</span>
          </h1>
          <p>
            I'm looking to start a new career as a Full Stack Web Developer.
            Feel free to browse my
            <a
              href="https://github.com/fetchcat"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              GitHub
            </a>
            and
            <NavLink to="/portfolio" className="text-link">
              Portfolio
            </NavLink>
            for examples of my work.
          </p>
          <NavLink to="/portfolio" className="button cta">
            <FaFolderOpen />
            View Portfolio
          </NavLink>
        </div>
        <div className="hero-section profile">
          <img src={profile} />
          <div className="social-media">
            <a
              href="https://github.com/fetchcat"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/michelleerogers/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://storage.googleapis.com/merdev-resume-download/WebDev%20Resume%205-31-2022.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <FaFilePdf />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
