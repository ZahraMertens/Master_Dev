import React from "react";
import { useQuery } from "@apollo/client";

import { TUTOR_BY_ID } from "../../utils/queries";

export default function AllTutorDetails(props) {

  const tutorId = props.tutorId
  console.log(tutorId)

  const { loading, data } = useQuery(TUTOR_BY_ID, {
    variables: { tutorId: tutorId },
  });

  const tutor = data?.onetutor || {};

  console.log(tutor)

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{tutor.firstName}</p>
    </div>
  );
}
