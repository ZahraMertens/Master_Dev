import "./tutorProfile.css";
import { FaCube, FaGraduationCap, FaCode, FaUser } from "react-icons/fa";

import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import TutorModal from "../../components/TutorModal/index";

import { TUTOR_BY_ID } from "../../utils/queries";

import ProfileImage from "../../assets/images/placeholder.jpg";

export default function TutorProfile() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleModalOpen = () => setShow(true);

  const { tutorId } = useParams();

  const { loading, data } = useQuery(TUTOR_BY_ID, {
    variables: { tutorId: tutorId },
  });

  const tutor = data?.onetutor || {};

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
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
            <img
              src={tutor.filenameImg ? `${tutor.filenameImg}` : ProfileImage}
              className="tutorProfile-img-tutor"
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
              <div className="col-xl-8 col-lg-10 col-md-12 col-sm-8 col-8 contact-profile-box">
                <h2 className="contact-header">
                  Email: <span className="contact-span span-email">{tutor.email}</span>
                </h2>
                <h2 className="contact-header">
                  Phone: <span className="contact-span">{tutor.phone}</span>
                </h2>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-5 small-box">
                <FaCode size={28} className="box-icon" />
                <h2 className="profile-box-header">Programming Language:</h2>
                <p className="p-box">{tutor.language}</p>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-5 small-box">
                <FaGraduationCap size={28} className="box-icon" />
                <h2 className="profile-box-header">Degree:</h2>
                <p className="p-box">{tutor.degree}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
            <Button
              className="btn btn-warning edit-profile-tutor"
              variant="primary"
              onClick={handleModalOpen}
            >
              EDIT PROFILE
            </Button>
          </div>
        </div>
        <div className="row about-me tutorProfile-lowercontainer">
          <div className="col">
            <h2>About Me:</h2>
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
      <TutorModal tutor={tutor} show={show} handleClose={handleClose} />
    </div>
  );
}
