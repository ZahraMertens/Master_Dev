import React from "react";
import "./profile.css";

import Placeholder from "../../assets/images/placeholder.jpg";
import Verified from "../../assets/images/verified.png";

import { Link } from 'react-router-dom';

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { TUTOR_BY_ID } from "../../utils/queries";

export default function Profile() {
  const { tutorId } = useParams();

  const { loading, data } = useQuery(TUTOR_BY_ID, {
    variables: { tutorId: tutorId },
  });

  const tutor = data?.onetutor || {};

  console.log(tutor.firstName)

  const renderSession = (rate) => {
    console.log(rate)
    return (rate * 5) -25
  }

  const renderDay = (rate) => {
    console.log(rate)
    return (rate * 8) -30
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="profile-main">
      <div className="profile-wrapper">
        <div className="row justify-content-md-center">
          <div className="col-3">
            <img src={Placeholder} className="placeholder-img" alt="ProfilePicture"/>
          </div>
          <div className="col">
            <h1>{tutor.firstName} {tutor.lastName}</h1>
            <h2>Language: {tutor.language}</h2>
            <h3>Degree: {tutor.degree}</h3>
          </div>
          <div className="col">
            <img src={Verified} className="verified-img" alt="ProfilePicture"/>
            <h1>
              $ {tutor.hourRate}/hr
            </h1>
            {/* <BookForm tutor={tutor} /> */}
            <Link 
              className="btn btn-ld btn-warning"
              to={`/book/${tutor._id}`}
            >
              <i className="fas fa-shopping-cart"></i> BOOK A SESSION
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="describtion-container">
              <h1>Describtion:</h1>
              <p>{tutor.describtion}</p>
            </div>
            <div className="method-container">
              <h1>Methology:</h1>
              <p>Test</p>
            </div>
          </div>
          <div className="col">
            <div className="degree-container">
              <h1>Degree:</h1>
              <h2>{tutor.degree}</h2>
            </div>
            <div className="background-container">
              <h1>Background:</h1>
              <p>Test</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1>Rates:</h1>
            <p>
              One hour online session: <span>${tutor.hourRate}/h</span>
            </p>
            <p>
              Five hour online session: <span>${renderSession(tutor.hourRate)}</span>
            </p>
            <p>
              Whole day (8 hours) online session: <span>${renderDay(tutor.hourRate)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
