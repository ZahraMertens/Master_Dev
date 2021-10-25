import React from 'react';
import { Link } from 'react-router-dom';

import noResult from "../../assets/images/noResult.jpg"

export default function ResultCard({ tutors, language }) {
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
            <div className="col-2">
              {/* <img src="./images/placeholder.jpg" className="profile-img" alt=""> */}
            </div>
            <div className="col-6">
              <h1>{tutor.firstName} {tutor.lastName}</h1>
              <p>{tutor.degree}</p>
              <p>{tutor.describtion}</p>
              <h2>
                <span>Language:</span> {tutor.language}
              </h2>
              <Link 
                className="btn btn-sm btn-warning"
                to={`/profile/${tutor._id}`}
                >
                View Full Profile
              </Link>
            </div>
            <div className="col-4">
              <h1>30 /hr</h1>
              <button className="btn btn-md btn-success">BOOK NOW</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
