import React from "react";
import ReactDOM from "react-dom/client";
import "./stylesheets/all.scss";
import App from "./App";
import axios from "axios";
import { HashRouter } from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const el = document.querySelector("#root");
const root = ReactDOM.createRoot(el);

root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);