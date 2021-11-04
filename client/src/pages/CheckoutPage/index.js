import React from 'react';
import "./CheckoutPage.css";
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

  const getToken = localStorage.getItem("id_token")

  if (!getToken){
    return (
      <div className="checkout-error">
        <h1>You must be logged in as a Student be be able to book a session!</h1>
      </div>
    )
  } else {
    return (
        <div className="checkoutPage">
          <Checkout tutor={tutor} />  
        </div>
    );
  }
}
