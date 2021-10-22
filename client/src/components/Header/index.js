import React from "react";
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
                <a className="nav-link active" aria-current="page" href="#home">
                  Test Nav
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#home">
                  Test Nav
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#home">
                  Test Nav
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#home">
                  Test Nav
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
