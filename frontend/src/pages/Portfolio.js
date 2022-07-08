import React from "react";

import { FaGithub, FaLink } from "react-icons/fa";

// --- Components --- //

const Portfolio = () => {
  return (
    <div className="container">
      <h1>Portfolio</h1>
      <article className="project">
        <div className="project-info">
          <h3>merogers.dev</h3>
          <div className="info">Full-Stack Portfolio Site</div>
          <div className="tags">
            <span>Tags:</span>
            <div className="tag orange">HTML5</div>
            <div className="tag blue">CSS</div>
            <div className="tag green">JavaScript</div>
            <div className="tag lightblue">React</div>
            <div className="tag green">Node.js</div>
            <div className="tag grey">Express</div>
            <div className="tag green">MongoDB</div>
          </div>
        </div>
        <div className="project-links">
          <a
            className="link site"
            href="https://merogers.dev"
            target="_blank"
            rel="noreferrer"
          >
            <FaLink />
            View Site
          </a>
          <a
            className="link code"
            href="https://github.com/fetchcat/merdev"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
            View Code
          </a>
        </div>
      </article>
      <article className="project">
        <div className="project-info">
          <h3>Grocery List App (React)</h3>
          <div className="info">Full-Stack Grocery List App</div>
          <div className="tags">
            <span>Tags:</span>
            <div className="tag orange">HTML5</div>
            <div className="tag blue">CSS</div>
            <div className="tag green">JavaScript</div>
            <div className="tag lightblue">React</div>
            <div className="tag green">Node.js</div>
            <div className="tag grey">Express</div>
            <div className="tag green">MongoDB</div>
          </div>
        </div>
        <div className="project-links">
          <a
            className="link site"
            href="https://glareact.merogers.dev/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLink />
            View App
          </a>
          <a
            className="link code"
            href="https://github.com/fetchcat/gla-react"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
            View Code
          </a>
        </div>
      </article>
      <article className="project">
        <div className="project-info">
          <h3>Grocery List App (Vanilla JS)</h3>
          <div className="info">Full-Stack Grocery List App</div>
          <div className="tags">
            <span>Tags:</span>
            <div className="tag orange">HTML5</div>
            <div className="tag blue">CSS</div>
            <div className="tag green">JavaScript</div>
            <div className="tag blue">MySQL</div>
            <div className="tag green">Node.js</div>
            <div className="tag grey">Express</div>
            <div className="tag blue">WebPack</div>
          </div>
        </div>
        <div className="project-links">
          <a
            className="link site"
            href="https://glajs.merogers.dev"
            target="_blank"
            rel="noreferrer"
          >
            <FaLink />
            View App
          </a>
          <a
            className="link code"
            href="https://github.com/fetchcat/gla-js"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
            View Code
          </a>
        </div>
      </article>
      <article className="project">
        <div className="project-info">
          <h3>WeatherSplash App</h3>
          <div className="info">Vanilla JS App - REST API</div>
          <div className="tags">
            <span>Tags:</span>
            <div className="tag orange">HTML5</div>
            <div className="tag blue">CSS</div>
            <div className="tag pink">SASS</div>
            <div className="tag blue">REST API</div>
            <div className="tag green">JavaScript</div>
            <div className="tag blue">WebPack</div>
          </div>
        </div>
        <div className="project-links">
          <a
            className="link site"
            href="https://weathersplash.merogers.dev/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLink />
            View App
          </a>
          <a
            className="link code"
            href="https://github.com/fetchcat/weathersplash"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
            View Code
          </a>
        </div>
      </article>
    </div>
  );
};

export default Portfolio;
