import "./tutorProfile.css"
import { FaCube, FaCubes, FaBoxOpen, FaGraduationCap, FaCode, FaUser } from "react-icons/fa";

import { Button } from "react-bootstrap";
import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import { Link } from "react-router-dom";
import TutorModal from "../../components/TutorModal/index"

import { TUTOR_BY_ID } from "../../utils/queries";

import ProfileImage from "../../assets/images/placeholder.jpg"

export default function TutorProfile() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleModalOpen = () => setShow(true);

  const { tutorId } = useParams();

  const { loading, data } = useQuery(TUTOR_BY_ID, {
    variables: { tutorId: tutorId },
  });

  const tutor = data?.onetutor || {};

  console.log(tutor);

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
            <img src={tutor.filenameImg ? `../uploads/${tutor.filenameImg}` : ProfileImage } className="profile-img-tutor" alt="test"></img>
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                <h1><FaUser size={28} /> <span>{tutor.firstName} {tutor.lastName}</span></h1>
              </div>
            </div>
            <br/>
            <div className="row contact-profile">
              <div className="col-8 contact-profile-box">
                <h2 className="contact-header">Email: <span className="contact-span">{tutor.email}</span></h2>
                <h2 className="contact-header">Phone: <span className="contact-span">{tutor.phone}</span></h2>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-4 small-box">
                <FaCode size={28} className="box-icon"/>
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
            <Button className="btn btn-warning" variant="primary" onClick={handleModalOpen}>
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
              <div className="col-4 rate-box">
                <FaCube size={28} className="rate-icon"/>
                <h1 className="rate-header">1 hr session</h1>
                <p className="p-rate">${tutor.hourRate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TutorModal tutor={tutor} show={show} handleClose={handleClose}/>
    </div>
  );
}
