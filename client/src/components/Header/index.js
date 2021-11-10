import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./header.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import UserProfile from "../UserProfile/UserProfile";
import Auth from "../../utils/auth";
import Logo from "../../assets/images/logo.png";

export default function Header() {
  const history = useHistory();

  const logout = async (event) => {
    await Auth.logout();
    history.push("/");
  };

  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="lg"
      className="navbar navbar-expand-lg navbar-light bg-light"
    >
      <Container className="container-fluid navbar-container">
        <Navbar.Brand>
          <Link to={"/"}>
            <img src={Logo} className="logo" alt="test" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="nav-text">
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link active3" to={`/`}>
                  Find a tutor
                </Link>
              </li>
              {Auth.loggedIn() ? (
                <>
                  <UserProfile
                    userType={Auth.getProfile().data.userType}
                    userId={Auth.getProfile().data._id}
                  />
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
                      className="nav-link active1"
                      aria-current="page"
                      to={`/signup-tutor`}
                    >
                      Become a tutor
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active2" to={`/signup-student`}>
                      Become a student
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active6" to={`/login-tutor`}>
                      Tutor Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active7" to={`/login-student`}>
                      Student Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
