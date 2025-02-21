import React, { StrictMode } from "react";
import ReactDom from "react-dom";
import App from "./components/App";

import "./index.css";
import "antd/dist/reset.css";

ReactDom.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root"),
);
