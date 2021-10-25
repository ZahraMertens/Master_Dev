import React from "react";
// import { Link } from 'react-router-dom';

// import { useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client";

// import { TUTOR_BY_ID } from "../../utils/queries";

export default function Profile() {
  // const { tutorId } = useParams();

  // const { loading, data } = useQuery(TUTOR_BY_ID, {
  //   variables: { tutorId: tutorId },
  // });

  // const tutor = data?.onetutor || {};

  return (
    <div className="profile-main">
      <div className="profile-wrapper">
        <div className="row">
          <div className="col">
            {/* <img src="./images/placeholder.jpg" className="placeholder-img" alt=""> */}
          </div>
          <div className="col">
            <h1>Name Name</h1>
            <h2>Language:</h2>
            <h3>JavaScript</h3>
          </div>
          <div className="col">
            <h1>
              <i className="fas fa-dollar-sign"></i> 30 /hr
            </h1>
            {/* <BookForm tutor={tutor} /> */}
            {/* <Link 
            className="btn btn-ld btn-warning"
            to={`/book/${tutor.id}`}
            >
              <i className="fas fa-shopping-cart"></i> BOOK A SESSION
            </Link> */}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="describtion-container">
              <h1>Describtion:</h1>
              <p>Test Test Test</p>
            </div>
            <div className="method-container">
              <h1>Methology:</h1>
              <p>Test</p>
            </div>
          </div>
          <div className="col">
            <div className="degree-container">
              <h1>Degree:</h1>
              <h2>Master in Computer Science</h2>
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
              One hour online session: <span>$30/h</span>
            </p>
            <p>
              Five hour online session: <span>$120</span>
            </p>
            <p>
              Whole day (8 hours) online session: <span>$220</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
