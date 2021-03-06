import React, { useEffect, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";

import "./success.css";
import Mail from "../../assets/images/mail-gif.gif";
import PageNotFound from "../../components/PageNotFound/index";

import { ADD_ORDER } from "../../utils/mutations";
import { TUTOR_BY_ID } from "../../utils/queries";

import Auth from "../../utils/auth";

export default function Success() {
  const tutorId = localStorage.getItem("tutor_id");

  const [addOrder] = useMutation(ADD_ORDER);

  const { loading, data } = useQuery(TUTOR_BY_ID, {
    variables: { tutorId: tutorId },
  });

  const orderCreated = useRef(false);

  useEffect(() => {
    if (data?.onetutor && !orderCreated.current) {
      orderCreated.current = true;
      console.log("test log if tutor")

      async function saveOrder() {

        const tutors = [data?.onetutor._id];

        if (tutors.length) {
          const { data } = await addOrder({ variables: { tutors } });
          const tutorData = data.addOrder.tutors;
        }

          setTimeout(() => {
            window.location.assign('/');
            localStorage.removeItem("tutor_id")
          }, 4000);
      }

      saveOrder();
    }
  }, [addOrder, data]);

  //If there is no tutorId in local storage the page can't be found
  //Ensures that the access to the success page is not possible through the URL /success only when redirected from stripe
  return (
    <div className="success-main">
      {tutorId ? (
      <div className="success-wrapper">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <img src={Mail} className="mail-img" alt="Mail" />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-success-message">
            <h1>Thank you {Auth.getProfile().data.firstName},</h1>
            <h2>Your payment was successful.</h2>
            <h3>We have send you an email with all necessary details!</h3>
          </div>
        </div>
      </div>) : (
        <PageNotFound />
      )}
    </div>
  );
}
