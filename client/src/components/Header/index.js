import React from "react";
import "./header.css";

import Logo from "../../assets/images/logo.png"

export default function Header() {
  return (
    <header class="fixed-top">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <img src={Logo} class="logo" alt="test" />
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul class="nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#home">
                  Test Nav
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#home">
                  Test Nav
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#home">
                  Test Nav
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#home">
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
