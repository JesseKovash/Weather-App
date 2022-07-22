import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./styles.css";

const mountNode = document.getElementById("app");
// const root = ReactDOM.createRoot(mountNode);
const root = createRoot(mountNode);
root.render(<App name="jesses-weather" />);

// ReactDOM.render(<App name="Jane" />, mountNode);