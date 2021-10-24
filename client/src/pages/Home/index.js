import React, { useState } from "react";
import { Link } from 'react-router-dom';

import "./home.css";

import { FaSearch } from "react-icons/fa";

import Video from "../../assets/images/e-learning-app-ad-copy.mp4";
import Works1 from "../../assets/images/howitworks1.png";
import Works2 from "../../assets/images/howitworks2.png";
import Works3 from "../../assets/images/howitworks3.png";
import WhyUs from "../../assets/images/whyus2.png";

export default function Home() {

  // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
  const [language, setLanguage] = useState("");

  const handleChange = (event) => {
    const { target } = event;
    const inputValue = target.value;
    const inputType = target.name;

    if (inputType === "language") {
      setLanguage(inputValue);
    }
  };

  return (
    <div>
      <div id="search" className="hero-main">
        <div className="hero-wrapper">
          <div className="row justify-content-center align-middle">
            <div className="header1">
              <div className="row justify-content-center align-middle">
                <div className="col">
                  <h1>Let us help you to become a master in web development</h1>
                </div>
              </div>
              <div className="row justify-content-center align-middle">
                <div className="col">
                  <h1>And find the perfect online tutor for you today</h1>
                </div>
              </div>
              <div className="row justify-content-center align-middle">
                <div className="col">
                  <p>Affordable one-on-one tutition</p>
                </div>
              </div>
              <div className="row justify-content-center align-middle">
                  <div className="col-4 search-hero">
                    <div className="input-group input-group-lg">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-lg"
                      >
                        <FaSearch />
                      </span>
                      <input
                        value={language}
                        name="language"
                        type="text"
                        placeholder="Java Script"
                        onChange={handleChange}
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                      />
                    </div>
                  </div>
                  <div className="col-2 btn-container-hero">
                    <Link
                      className="btn btn-lg btn-search-hero align-start"
                      to={`/results/${language}`}
                    >
                      FIND A TUTOR
                    </Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="advert-main">
        <div className="advert-wrapper">
          <div className="row">
            <div className="col">
              <video className="advert-video" controls>
                <source src={Video} type="video/mp4" />
                <source src="movie.ogg" type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="col justify-content-center">
              <div className="row text-advert-container">
                <div className="col-6">
                  <h1>Improve your coding skills with online tutoring</h1>
                  <p>
                    E learning gives the student and tutor more flexibility.
                    With Master Dev you have access to the best tutors in the
                    business who can help you to improve your skills, further
                    your knowldege and find bugs & resolve issues from the
                    comfort of your own home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="how-itworks-main">
        <div className="howitworks-wrapper">
          <div className="row justify-content-center">
            <div className="col">
              <h1 className="howitworks-header">How it works</h1>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col">
              <img className="howitworks-img" src={Works1} alt="" />
            </div>
            <div className="col">
              <h1 className="howitworks-section-header">
                Search for a tutor by your prefered programming language
              </h1>
              <p>
                There are hundreds of web developer tutors who are ready and
                willing to help you to become a master developer.
              </p>
              <p>
                Browse for your prefered programming language and find the
                perfect tutor based on your requirements.
              </p>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col">
              <h1 className="howitworks-section-header">Book a session</h1>
              <p>
                View the the tutors profile and if you like what the tutor has
                to offer click on the 'book now' button and book a session.
              </p>
            </div>
            <div className="col">
              <img className="howitworks-img" src={Works2} alt="" />
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col">
              <img className="howitworks-img" src={Works3} alt="" />
            </div>
            <div className="col">
              <h1 className="howitworks-section-header">
                Your journey to become a tech master starts now!
              </h1>
              <p>
                Start learning, improve your skills, solve issues and learn from
                experienced web developers!
              </p>
              <a href="#search">
                <button type="button" className="btn btn-lg btn-getstarted">
                  Get started!
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="benefits-main">
        <div className="benefits-wrapper">
          <div className="row justify-content-center">
            <div className="col">
              <h1 className="whyus-header">Why us?</h1>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col">
              <div className="row">
                <div className="col">
                  <h1>one-on-one tutoring</h1>
                  <p>
                    Allows the student to ask specific questions and the tutor
                    can concentrate on your concerns
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h1>Screen Sharing</h1>
                  <p>
                    Show your real time work and allow the tutor to inspect your
                    code in detail and work on it at the same time.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <img className="whyus-img" src={WhyUs} alt="Why us" />
            </div>
            <div className="col">
              <div className="row">
                <div className="col">
                  <h1>Screen Sharing</h1>
                  <p>
                    Show your real time work and allow the tutor to inspect your
                    code in detail and work on it at the same time.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h1>Screen Sharing</h1>
                  <p>
                    Show your real time work and allow the tutor to inspect your
                    code in detail and work on it at the same time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="startnow-main">
        <div className="startnow-wrapper">
          <div className="row align-items-center">
            <div className="col student-container">
              <h1>Student</h1>
              <ul>
                <li>Online access 24x7</li>
                <li>Starts from 20$</li>
                <li>Learn any language from home</li>
              </ul>
              <Link  
                className="btn signup-btn"
                to={`/signup-student`}
                >
                SIGN UP
              </Link>
            </div>
            <div className="col tutor-container">
              <h1>Tutor</h1>
              <ul>
                <li>
                  Freedom and flexibility to set your own hours and payment
                </li>
                <li>Get paid straight and save into your bank account</li>
                <li>Work from home</li>
              </ul>
              <Link  
                className="btn signup-btn"
                to={`/signup-tutor`}
                >
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
