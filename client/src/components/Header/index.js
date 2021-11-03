import React from "react";
import { Link, useHistory } from 'react-router-dom';
import "./header.css";

import UserProfile from "../UserProfile/UserProfile";

import Auth from '../../utils/auth';

import Logo from "../../assets/images/logo.png"

export default function Header() {

  const history = useHistory();

  const logout = async (event) => {
    //event.preventDefault();
    await Auth.logout();
    //window.location.reload(true);
    history.push("/")
  };

  //Only when user logged in
  // console.log(Auth.getProfile().data.userType)

  return (
    <header className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to={"/"}>
          <img src={Logo} className="logo" alt="test" />
          </Link>
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
                 className="nav-link active3" 
                 to={`/`}
                 >
                  Find a tutor
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link 
                className="nav-link active4"
                to={`/`}>
                  Home
                </Link>
              </li> */}
              {Auth.loggedIn() ? (
                <>
                <UserProfile userType={Auth.getProfile().data.userType} userId={Auth.getProfile().data._id} />
                <li className="nav-item">
                  <a
                  className="nav-link logout-btn"
                  href="/"
                  onClick={logout}
                  >
                    Logout
                  </a>
                </li>
              </>
              ) : (
                <>
                <li className="nav-item">
                <Link 
                  className="nav-link active1" aria-current="page" 
                  to={`/signup-tutor`}
                  >
                  Become a tutor
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link active2" 
                  to={`/signup-student`}
                  >
                  Become a student
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                className="nav-link active6"
                to={`/login-tutor`}>
                  Tutor Login
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                className="nav-link active7"
                to={`/login-student`}>
                  Student Login
                </Link>
              </li>
              </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
