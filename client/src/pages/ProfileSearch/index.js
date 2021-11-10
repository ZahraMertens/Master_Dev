import React from "react";
import "./profile.css";
import {
  FaCube,
  FaGraduationCap,
  FaCode,
  FaUser,
} from "react-icons/fa";
import ProfileImage from "../../assets/images/placeholder.jpg";
import Verified from "../../assets/images/verified.png";

import Auth from "../../utils/auth";

import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { TUTOR_BY_ID } from "../../utils/queries";

export default function Profile() {
  const { tutorId } = useParams();

  const { loading, data } = useQuery(TUTOR_BY_ID, {
    variables: { tutorId: tutorId },
  });

  const tutor = data?.onetutor || {};

  const getToken = localStorage.getItem("id_token");

  const getUserType = () => {
    if (getToken !== null) {
      return Auth.getProfile().data.userType;
    }
    console.log("No token");
  };

  function hideEmail(email) {
    const fullEmail = email;
    const encodedEmail = fullEmail.slice(0, 10) + "...";
    return encodedEmail;
  }

  function hidePhone(phone) {
    const fullPhone = phone;
    const encodedPhone =
      fullPhone.slice(0, 4) + "...(book to have access to further details)";
    return encodedPhone;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="tutorProfile-main">
      <div className="profile-wrapper">
        <div className="row">
          <div className="col">
            <h1 className="tutorProfile-header">Tutor Profile</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <img
              src={tutor.filenameImg ? `${tutor.filenameImg}` : ProfileImage}
              className="profile-img-tutor-result"
              alt="test"
            ></img>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="row">
              <div className="col">
                <h1>
                  <FaUser size={28} />{" "}
                  <span>
                    {tutor.firstName} {tutor.lastName}
                  </span>
                </h1>
              </div>
            </div>
            <br />
            <div className="row contact-profile">
              <div className="col-8 contact-profile-box">
                <h2 className="contact-header">
                  Email:{" "}
                  <span className="contact-span">{hideEmail(tutor.email)}</span>
                </h2>
                <h2 className="contact-header">
                  Phone:{" "}
                  <span className="contact-span">{hidePhone(tutor.phone)}</span>
                </h2>
              </div>
            </div>
            <br />
            <div className="row ">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-5 small-box">
                <FaCode size={28} className="box-icon" />
                <h2 className="profile-box-header-result">
                  Programming Language:
                </h2>
                <p className="p-box">{tutor.language}</p>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-5 small-box">
                <FaGraduationCap size={28} className="box-icon" />
                <h2 className="profile-box-header-result">Degree:</h2>
                <p className="p-box">{tutor.degree}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
            <img src={Verified} className="verified-img" alt="ProfilePicture" />
            <h2>${tutor.hourRate}/hr</h2>
            {getUserType() === "Student" ? (
              <Link
                className="btn btn-ld btn-warning"
                to={`/book/${tutor._id}`}
              >
                <i className="fas fa-shopping-cart"></i> BOOK A SESSION
              </Link>
            ) : (
              <p className="login-p-error">
                Login as a student to book a session!
              </p>
            )}
          </div>
        </div>
        <div className="row about-me">
          <div className="col">
            <h2>About {tutor.firstName}:</h2>
            <p className="p-about">{tutor.description}</p>
          </div>
        </div>
        <div className="row tutorProfile-lowercontainer">
          <div className="col">
            <h2>Rate:</h2>
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-6 col-sm-7 col-7 rate-box">
                <FaCube size={28} className="rate-icon" />
                <h1 className="rate-header">1 hr session</h1>
                <p className="p-rate">${tutor.hourRate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
