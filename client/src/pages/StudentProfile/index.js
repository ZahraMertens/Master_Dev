import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";

import { STUDENT_BY_ID } from "../../utils/queries";
import StudentModal from "../../components/StudentModal/index";
// import { UPDATE_STUDENT } from "../../utils/mutations";

import AllTutors from "../../components/AllTutorIds/index";

import Auth from "../../utils/auth";

import "./studentProfile.css";
import { FaUser } from "react-icons/fa";

// import Auth from "../../utils/auth";

export default function StudentProfile() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleModalOpen = () => setShow(true);

  const { studentId } = useParams();
  console.log(studentId);

  const { loading, data } = useQuery(STUDENT_BY_ID, {
    variables: { studentId: studentId },
  });

  const student = data?.onestudent || {};

  console.log(student);

  const getToken = localStorage.getItem("id_token");

  if (loading) {
    return <div>Loading...</div>;
  } else if (!getToken) {
    return (
      <div className="checkout-error">
        <h1>
          You must be logged in as a Student be be able to book a session!
        </h1>
      </div>
    );
  } else {
    return (
      <div className="studentProfile-main">
        <div className="studentProfile-wrapper">
          <div className="row justify-content-center">
            <div className="col">
              <h1>My Student Profile</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <FaUser size={70} />
            </div>
          </div>
          <div className="row student-info">
            <div className="col">
              <h1 className="studentProfile-tag">First Name:</h1>
              <h2 className="studentProfile-text">{student.firstName}</h2>
            </div>
          </div>
          <div className="row student-info">
            <div className="col">
              <h1 className="studentProfile-tag">Last Name:</h1>
              <h2 className="studentProfile-text">{student.lastName}</h2>
            </div>
          </div>
          <div className="row student-info">
            <div className="col">
              <h1 className="studentProfile-tag">Email:</h1>
              <h2 className="studentProfile-text">{student.email}</h2>
            </div>
          </div>
          <Button className="btn btn-editStudent" onClick={handleModalOpen}>
            EDIT PROFILE
          </Button>
        </div>
        <div className="studentProfile2-wrapper">
          <div className="row justify-content-center">
            <div className="col">
              <h1 className="myTutors">My Tutors</h1>
            </div>
          </div>
          <div className="row allTutors-container">
            <AllTutors orders={student.orders} />
          </div>
        </div>
        <StudentModal student={student} show={show} handleClose={handleClose} />
      </div>
    );
  }
}
