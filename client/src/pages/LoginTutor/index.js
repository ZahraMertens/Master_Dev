import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_TUTOR } from "../../utils/mutations";

import Auth from "../../utils/auth";

import "./logintutor.css";

export default function LoginTutor() {

  const [formState, setFormState] = useState({ email: "", password: "" });

  const [loginTutor, { error, data }] = useMutation(LOGIN_TUTOR);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await loginTutor({
        variables: { ...formState },
      });

      Auth.login(data.loginTutor.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  const getToken = localStorage.getItem("id_token")

  if (getToken){
    return (
      <div className="logout-signup">

      </div>
    )
  } else {
  return (
    <div className="logintutor-main">
      <div className="logintutor-wrapper">
        <div className="row">
          <div className="col">
            <h1 className="header-login">Tutor Login:</h1>
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
            <form onSubmit={handleFormSubmit}>
              <label
                className="form-label label-login"
              >
                Email
              </label>
              <input
                type="email"
                className="form-control input-login"
                id="validationCustom01"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
              <label
                className="form-label label-login"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control input-login"
                id="validationCustom01"
                name="password"
                value={formState.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn btn-login btn-success">LOGIN</button>
            </form>
             )}

             {error && (
               <div className="my-3 p-3 bg-danger text-white">
                 Something went wrong! Please try again...
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
  }
}
