import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { TUTOR_BY_ID } from "../../utils/queries";

export default function TutorProfile() {

  const { tutorId } = useParams();

  const { loading, data } = useQuery(TUTOR_BY_ID, {
    variables: { tutorId: tutorId },
  });

  const tutor = data?.onetutor || {};

  console.log(tutor.firstName);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <h1>Tutor</h1>
    </div>
  );
}
