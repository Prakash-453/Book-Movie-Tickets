import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
// import Seats1 from "./Components/SeatsComponent/Seats1";
// import Seats2 from "./Components/SeatsComponent/Seats2";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <Seats1/> */}
    {/* <Seats2/> */}
  </React.StrictMode>
);
