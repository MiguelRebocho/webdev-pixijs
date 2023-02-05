import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Canvas from "./Canvas";
import App from "./App";
import { FpsView } from "react-fps";
import * as _ from 'lodash';

const config = {
  width: 1920,
  height: 1080,
  antialias: true,
};

ReactDOM.render(
  <React.StrictMode>
    <Canvas init={App} {...config} />
    <FpsView/>
  </React.StrictMode>,
  document.getElementById("root")
);
