import React from "react";
import { Link } from "react-router-dom";

export default function UserProfile({ userType, userId }) {

  switch (userType) {
    case "Student": {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link active5" to={`/studentProfile/${userId}`}>
              My Profile
            </Link>
          </li>
        </>
      );
    }
    case "Tutor": {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link active5" to={`/tutorProfile/${userId}`}>
              My Profile
            </Link>
          </li>
        </>
      );
    }
    default: {
      return (
        <>
          <h1>Test</h1>
        </>
      );
    }
  }
}
