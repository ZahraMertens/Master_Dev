import React from 'react';
import { Link } from 'react-router-dom';

import { FaCheckCircle } from "react-icons/fa";
import "./resultCard.css";

import ProfileImage from "../../assets/images/placeholder.jpg"

import noResult from "../../assets/images/noResult.jpg"

export default function ResultCard({ tutors, language }) {

  function shortDescription(description) {
    const fullDes = description;
    const shortDesc = fullDes.slice(0, 120) + "... (view full profile)"
    return shortDesc
  }
  
  if (!tutors.length) {
    return (
      <div className="not-found">
        <img src={noResult} className="noResult-img" alt="no result found"/>
        <h3>Sorry, we couldn't find any tutors who teach {language}.</h3>
      </div>
    );
  }

  return (
    <div>
      {tutors.map((tutor) => (
        <div key={tutor._id} className="results-card">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 image-container-card">
              <img src={tutor.filenameImg ? `${tutor.filenameImg}` : ProfileImage } className="profile-img-tutor-card" alt="test"></img>
            </div>
            <div className="col info-card-container">
              <h1 className="tutor-name">{tutor.firstName} {tutor.lastName}</h1>
              <p className="education-text"><span className="degree-tag">Degree: </span>{tutor.degree}</p>
              <h2 className="language-text">
                <span className="language-tag">Language:</span> {tutor.language}
              </h2>
              <h2 className="about-tag">About {tutor.firstName}:</h2>
              <p>{shortDescription(tutor.description)}</p>
              <Link 
                className="btn btn-sm btn-viewPofile"
                to={`/profile/${tutor._id}`}
                >
                View Full Profile
              </Link>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 pricing-container">
              <FaCheckCircle size={42} className="check-icon" />
              <h1>${tutor.hourRate}/hr</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
