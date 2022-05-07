import React from "react";
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("app"));

import "./src/styles/index.scss";

// Base App

import App from "./src/App";

root.render(<App />);
