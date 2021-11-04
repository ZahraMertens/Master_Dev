import React from "react";
import "./profile.css";
import { FaCube, FaCubes, FaBoxOpen, FaGraduationCap, FaCode, FaUser } from "react-icons/fa";
import ProfileImage from "../../assets/images/placeholder.jpg"
import Placeholder from "../../assets/images/placeholder.jpg";
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

  console.log(tutor.firstName);

  const getToken = localStorage.getItem("id_token");

  const getUserType = () => {
    console.log(getToken);
    if (getToken !== null) {
      console.log(Auth.getProfile().data.userType);
      return Auth.getProfile().data.userType;
    }
    console.log("No token");
  };

  function hideEmail(email) {
    const fullEmail = email;
    const encodedEmail = fullEmail.slice(0, 10) + "..."
    return encodedEmail
  }

  function hidePhone(phone) {
    const fullPhone = phone;
    const encodedPhone = fullPhone.slice(0, 4) + "...(book to have access to further details)"
    return encodedPhone
  }

  console.log(getUserType);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="tutorProfile-main">
      <div className="tutorProfile-wrapper">
        <div className="row">
          <div className="col">
            <h1 className="tutorProfile-header">My Tutor Profile</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <img
              src={
                tutor.filenameImg
                  ? `../uploads/${tutor.filenameImg}`
                  : ProfileImage
              }
              className="profile-img-tutor"
              alt="test"
            ></img>
          </div>
          <div className="col">
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
                  Email: <span className="contact-span">{hideEmail(tutor.email)}</span>
                </h2>
                <h2 className="contact-header">
                  Phone: <span className="contact-span">{hidePhone(tutor.phone)}</span>
                </h2>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-4 small-box">
                <FaCode size={28} className="box-icon" />
                <h2 className="profile-box-header">Programming Language:</h2>
                <p className="p-box">{tutor.language}</p>
              </div>
              <div className="col-4 small-box">
                <FaGraduationCap size={28} className="box-icon" />
                <h2 className="profile-box-header">Degree:</h2>
                <p className="p-box">{tutor.degree}</p>
              </div>
            </div>
          </div>
          <div className="col-2">
          <img src={Verified} className="verified-img" alt="ProfilePicture"/>
          <h2>${tutor.hourRate}/hr</h2>
          {getUserType() === "Student" ? (
            <Link 
              className="btn btn-ld btn-warning"
              to={`/book/${tutor._id}`}
            >
              <i className="fas fa-shopping-cart"></i> BOOK A SESSION
            </Link>) : (
              <p className="login-p-error">Login as a student to book a session!</p>
            )}
          </div>
        </div>
        <div className="row about-me tutorProfile-lowercontainer">
          <div className="col">
            <h2>About {tutor.firstName}:</h2>
            <p className="p-about">{tutor.description}</p>
          </div>
        </div>
        <div className="row tutorProfile-lowercontainer">
          <div className="col">
            <h2>Rate:</h2>
            <div className="row">
              <div className="col-4 rate-box">
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
