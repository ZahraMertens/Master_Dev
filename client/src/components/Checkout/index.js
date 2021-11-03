import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery, useQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
// import { TUTOR_BY_ID } from "../../utils/queries";
//import { idbPromise } from '../../utils/helpers';
//import CartItem from '../CartItem';
import Auth from "../../utils/auth";
//import { useStoreContext } from '../../utils/GlobalState';
//import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';

// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe(
  "pk_test_51JljitDQYZbnuPWj4ox5O5YUQEqQTZ8jRtYNLDXKY4275jmExTXudjm2tNZBi4I1zODPyb0A49UUNFrpp2a96KyU00E8EijJkt"
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
      console.log(data.checkout.session) //sessionid
      console.log(data)
      //checkout: {__typename: 'Checkout', session: 'cs_test_a11gWLj01l3ElnMP7RoLTd7fGgpzDgaLOyglXgrpAnyTDCz3QCQZkDFZ7Z'}
      stripePromise
      .then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      })
      // .then((result) => {
      //   console.log(result)
      // })
    }
  }, [data]);

  function submitCheckout() {
    const tutorId = [tutor._id];

    console.log(tutorId) //Returns array with id in index position 0

    getCheckout({
      variables: { tutors: tutorId },
    });
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <h1>1 x 1 hour session with {tutor.firstName} {tutor.lastName}</h1>
        <h3>AUD$ {tutor.hourRate}</h3>
      </div>
      {Auth.loggedIn() ? (
        <button className="checkout-btn btn btn-large" onClick={submitCheckout}>Checkout</button>
      ) : (
        <span>(log in to check out)</span>
      )}
    </div>
  );
};

export default Cart;
