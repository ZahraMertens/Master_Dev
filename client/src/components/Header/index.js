import React from "react";
import { Link } from 'react-router-dom';
import "./header.css";

import Logo from "../../assets/images/logo.png"

export default function Header() {
  return (
    <header className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img src={Logo} className="logo" alt="test" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="nav">
              <li className="nav-item">
                <Link 
                  className="nav-link active" aria-current="page" 
                  to={`/signup-tutor`}
                  >
                  Become a tutor
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link" 
                  to={`/signup-student`}
                  >
                  Become a student
                </Link>
              </li>
              <li className="nav-item">
                <Link
                 className="nav-link" 
                 to={`/`}
                 >
                  Find a tutor
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                className="nav-link"
                to={`/`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                className="nav-link"
                to={`/login-tutor`}>
                  Tutor Login
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                className="nav-link"
                to={`/login-student`}>
                  Student Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
