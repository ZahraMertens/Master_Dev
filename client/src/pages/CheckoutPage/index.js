import React from 'react';
import "./Checkout.css";
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { TUTOR_BY_ID } from "../../utils/queries";

import Checkout from "../../components/Checkout/index"

export default function CheckoutPage () {

  const { tutorId } = useParams();

  console.log(tutorId);

  const { loading, data } = useQuery(TUTOR_BY_ID, {
    variables: { tutorId: tutorId },
  });

  const tutor = data?.onetutor || {};

  console.log(tutor.hourRate);
    return (
        <div>
          <Checkout tutor={tutor} />  
        </div>
    )
}
