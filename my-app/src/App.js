import "./App.css";
import React from "react";
import { Home } from "./Home";
import { PatientData } from "./PatientData";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          Medical Notes Management
        </h3>
        <nav className="navbar navbar-expand bg-green navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/patientdata"
              >
                Patient Data
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/patientdata" element={<PatientData />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
