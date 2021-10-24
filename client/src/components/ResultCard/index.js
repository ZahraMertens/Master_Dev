import React from 'react';
import { Link } from 'react-router-dom';

export default function ResultCard({ tutors }) {
  if (!tutors.length) {
    return (
      <h3>There are no tutors available who teach this programming language</h3>
    );
  }

  return (
    <div>
      {tutors.map((tutor) => (
        <div key={tutor.id} className="results-card">
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
                to={`/tutor/${tutor.id}`}
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
