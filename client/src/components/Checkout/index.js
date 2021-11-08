import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import CheckoutImage from "../../assets/images/checkout.png";
import Zoom from "../../assets/images/zoom.png";

import { FaShoppingCart } from "react-icons/fa";
import "./checkout.css";
import Auth from "../../utils/auth";

// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe(
  `pk_test_51JljitDQYZbnuPWj4ox5O5YUQEqQTZ8jRtYNLDXKY4275jmExTXudjm2tNZBi4I1zODPyb0A49UUNFrpp2a96KyU00E8EijJkt`
);

const Cart = ({ tutor }) => {
  // const { tutorId } = useParams();
  console.log(tutor._id);
  console.log(tutor.hourRate);

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // We check to see if there is a data object that exists, if so this means that a checkout session was returned from the backend
  // Then we should redirect to the checkout with a reference to our session id
  useEffect(() => {
    if (data) {
      console.log(data.checkout.session); //sessionid
      console.log(data);
      localStorage.setItem("tutor_id", tutor._id);
      //checkout: {__typename: 'Checkout', session: 'cs_test_a11gWLj01l3ElnMP7RoLTd7fGgpzDgaLOyglXgrpAnyTDCz3QCQZkDFZ7Z'}
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  function submitCheckout() {
    const tutorId = [tutor._id];

    console.log(tutorId); //Returns array with id in index position 0

    getCheckout({
      variables: { tutors: tutorId },
    });
  }

  return (
    <div className="checkout-wrapper">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12 col-12">
          <div className="cart">
            <h1 className="shopping-header"><FaShoppingCart className="shopping-icon" /> Shopping Cart</h1>
            <div className="cart-content">
              <ul>
                <li className="shopping-item">
                 x 1 Hour Tutoring Session with {tutor.firstName} {tutor.lastName} 
                </li>
                <li className="shopping-item2">
                  via <img src={Zoom} className="zoom-img" alt="Zoom Logo"/>
                </li>
              </ul>
              <div className="shopping-price-container">
                <h3 className="shopping-price-tag">Total:</h3>
                <h3 className="shopping-price-price">AUD$ {tutor.hourRate}</h3>
              </div>
            </div>
            {Auth.loggedIn() ? (
              <button
                className="checkout-btn btn btn-large"
                onClick={submitCheckout}
              >
                Checkout
              </button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-5 col-sm-12 col-12 image-container">
          <img src={CheckoutImage} className="checkout-image" alt="Checkout Icon" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
