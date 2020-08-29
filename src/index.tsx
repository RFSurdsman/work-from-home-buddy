import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ExtensionApp from "./app/extension/ExtensionApp";
import DashboardApp from "./app/dashboard/DashboardApp";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    {document.getElementById("root") ? <ExtensionApp /> : <DashboardApp />}
  </React.StrictMode>,
  document.getElementById("root") ?? document.getElementById("root-newtab")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Trick for hot reloading
require("./background");
require("./restrictedPage");
