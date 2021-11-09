import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InputGroup, FormControl } from "react-bootstrap";
// import { Typeahead } from 'react-bootstrap-typeahead';
import { Autocomplete, TextField } from "@mui/material";
// import options from './data';
import "./home.css";
// import 'react-bootstrap-typeahead/css/Typeahead.css';

import { FaSearch } from "react-icons/fa";

// import Video from "../../assets/images/e-learning-app-ad-copy.mp4";
import Video from "../../assets/images/videoAdd.mp4";
import Works1 from "../../assets/images/howitworks1.png";
import Works2 from "../../assets/images/howitworks2.png";
import Works3 from "../../assets/images/howitworks3.png";
import WhyUs from "../../assets/images/whyus2.png";

const languages = [
  {
    title: "Ruby",
  },
  {
    title: "JavaScript",
  },
  {
    title: "Python",
  },
  {
    title: "C++",
  },
  {
    title: "Java",
  },
  {
    title: "php",
  },
  {
    title: "TypeScript",
  },
  {
    title: "C#",
  },
  {
    title: "Perl",
  },
  {
    title: "Shell",
  },
  {
    title: "Swift",
  },
];

export default function Home() {
  // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
  const [language, setLanguage] = useState("JavaScript");

  // const handleChange = (event) => {
  //   const { target } = event;
  //   const inputValue = target.value;
  //   const inputType = target.name;

  //   if (inputType === "language") {
  //     setLanguage(inputValue);
  //   }
  // };

  const getToken = localStorage.getItem("id_token");

  return (
    <div>
      <div id="search" className="hero-main">
        <div className="hero-wrapper">
          <div className="row justify-content-center align-middle">
            <div className="header1">
              <div className="row justify-content-center align-middle">
                <div className="col">
                  <h1>
                    Let us help you to become a master in web development.
                  </h1>
                </div>
              </div>
              <div className="row justify-content-center align-middle">
                <div className="col">
                  <h1>Find the perfect online tutor for you today!</h1>
                </div>
              </div>
              <div className="row justify-content-center align-middle">
                <div className="col">
                  <p className="p-affordable">Affordable one-on-one tutoring</p>
                </div>
              </div>
              <div className="row justify-content-center align-middle">
                <div className="col-xl-4 col-lg-4 col-md-5 col-sm-7 col-7 search-hero">
                  <div className="input-group input-group-lg">
                    <InputGroup size="lg">
                      <InputGroup.Text id="basic-addon1">
                        <FaSearch />
                      </InputGroup.Text>
                      <Autocomplete
                        className="autocomplete"
                        inputValue={language}
                        onInputChange={(_, val) => {
                          setLanguage(val);
                        }}
                        options={languages.map((option) => option.title)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            className="auto-text"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />
                        )}
                      />
                      {/* <FormControl
                        value={language}
                        className="autocomplete"
                        name="language"
                        type="text"
                        placeholder="JavaScript"
                        onChange={handleChange}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      /> */}
                    </InputGroup>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-3 btn-container-hero">
                  <Link
                    type="button"
                    className="btn btn-lg btn-search-hero"
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
          <div className="row advert-container">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <video className="advert-video" controls>
                <source src={Video} type="video/mp4" />
                <source src="movie.ogg" type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-advert-container">
              <h1 className="video-header">
                Improve your coding skills with online tutoring
              </h1>
              <p className="video-text">
                E learning gives the student and tutor more flexibility. With
                Master Dev you have access to the best tutors in the business
                who can help you to improve your skills, further your knowldege
                and find bugs & resolve issues from the comfort of your own
                home.
              </p>
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
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <img className="howitworks-img" src={Works1} alt="how it works" />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
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
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <h1 className="howitworks-section-header">Book a session</h1>
              <p>
                View the the tutors profile and if you like what the tutor has
                to offer, sign up as a student and book a session.
              </p>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <img className="howitworks-img" src={Works2} alt="" />
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <img className="howitworks-img" src={Works3} alt="" />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <h1 className="howitworks-section-header">
                Your journey to become a tech master starts now!
              </h1>
              <p>
                Start learning, improve your skills, solve problems and learn
                from experienced web developers!
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
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="row">
                <div className="col">
                  <h1>One-On-One Tutoring</h1>
                  <p>
                    Allows the student to ask specific questions so the tutor
                    can concentrate on your concerns.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h1>Screen Sharing</h1>
                  <p>
                    Show your real time work, allow the tutor to inspect your
                    code in detail and work on it at the same time.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="row justify-content-center">
                <img className="whyus-img" src={WhyUs} alt="Why us" />
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="row">
                <div className="col">
                  <h1>Study From Home</h1>
                  <p>
                    You can not only improve your skills. With MasterDev we make
                    sure that you can do it from the comfort of your home.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h1>Cost Efficient</h1>
                  <p>
                    By booking sessions online, you decrease the tution fees by
                    almost 50% which makes it affordable for everyone.
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
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 student-container">
              <h1>Student</h1>
              <ul>
                <li>Online access 24x7</li>
                <li>Starts from 20$</li>
                <li>Learn any language from home</li>
              </ul>
              {getToken ? (
                <p></p>
              ) : (
                <Link className="btn signup-btn" to={`/signup-student`}>
                  SIGN UP
                </Link>
              )}
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 tutor-container">
              <h1>Tutor</h1>
              <ul>
                <li>
                  Freedom and flexibility to set your own hours and payment
                </li>
                <li>Get paid straight and save into your bank account</li>
                <li>Work from home</li>
              </ul>
              {getToken ? (
                <p></p>
              ) : (
                <Link className="btn signup-btn" to={`/signup-tutor`}>
                  SIGN UP
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
