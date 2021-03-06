import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_STUDENT } from "../../utils/mutations";

import Auth from "../../utils/auth";

import PageNotFound from "../../components/PageNotFound/index";
import Loading from "../../components/Loading/index"

import "./loginstudent.css";

export default function LoginStudent() {
  
  const [formState, setFormState] = useState({ email: "", password: "" });

  const [loginStudent, { loading, error, data }] = useMutation(LOGIN_STUDENT);

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

    try {
      const { data } = await loginStudent({
        variables: { ...formState },
      });

      Auth.login(data.loginStudent.token);
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

  if (loading) {
    return <Loading />
  } else if (getToken){
    return (
      <PageNotFound />
    )
  } else {
  return (
    <div className="loginstudent-main">
      <div className="loginstudent-wrapper">
        <div className="row">
          <div className="col">
            <h1 className="header-login">Student Login:</h1>
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <label className="form-label label-login">Email</label>
                <input
                  type="email"
                  className="form-control input-login"
                  id="validationCustom01"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
                <label className="form-label label-login">Password</label>
                <input
                  type="password"
                  className="form-control input-login"
                  id="validationCustom01"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="btn btn-login btn-success">
                  LOGIN
                </button>
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
