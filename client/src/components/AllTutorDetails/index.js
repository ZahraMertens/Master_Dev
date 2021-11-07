import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { Card } from "react-bootstrap";
import "./AllTutorDetails.css";

import { TUTOR_BY_ID } from "../../utils/queries";

export default function AllTutorDetails(props) {
  const tutorId = props.tutorId;
  console.log(tutorId);

  const { loading, data } = useQuery(TUTOR_BY_ID, {
    variables: { tutorId: tutorId },
  });

  const tutor = data?.onetutor || {};

  console.log(tutor);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col">
      <Card className="myTutor-Card" style={{ width: "13rem" }}>
        <Card.Img variant="top" src={tutor.filenameImg} />
        <Card.Body>
          <Card.Title>
            {tutor.firstName} {tutor.lastName}
          </Card.Title>
          <Card.Text>{tutor.language}</Card.Text>
          <Link className="btn btn-sm btn-warning" to={`/profile/${tutor._id}`}>Profile</Link>
        </Card.Body>
      </Card>
    </div>
  );
}
