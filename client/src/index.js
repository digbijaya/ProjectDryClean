import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";
// import { unregister } from "./registerServiceWorker";
import LocalServiceWorkerRegister from "./mysw-register";

ReactDOM.render(<App />, document.getElementById("root"));
// unregister();
LocalServiceWorkerRegister();
// registerServiceWorker();

// if ("serviceWorker" in navigator) {
//   console.log("IN IN IN");
//   window.addEventListener("load", function() {
//     navigator.serviceWorker.register("/myservice-worker.js");
//   });
// }
