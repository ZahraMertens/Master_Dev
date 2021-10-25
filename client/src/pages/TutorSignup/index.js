//const {loading, data, error } = useQuery(Query from auth.js)
// loading = when accesing to db we track te prgress
// when loading finished loading= false
// data = array of objects of data from db
//error = undefined no error

//Mutation
// const [addProfile, {error, data}] = useMutation(ADD_PROFILE)
//then call function in handle form submit

import "./tutorsignup.css";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_TUTOR } from '../../utils/mutations';

import Auth from '../../utils/auth';

export default function TutorSignup() {

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    describtion: '',
    language: '',
    degree: '',
    hourRate: '',
    userType: "Tutor",
  });

  const [addTutor, { error, data }] = useMutation(ADD_TUTOR);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addTutor({
        variables: { ...formState },
      });

      Auth.login(data.addTutor.token);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <div className="tutorsignup-main">
        <div className="signup-wrapper">
          <div className="row form-tutorsignup">
            <div className="col">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form className="row" onSubmit={handleFormSubmit}>
                <div className="col-12">
                  <h1>Tutor Sign Up</h1>
                </div>
                <div className="col-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Mark"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="validationCustom01" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Doe"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="validationCustom01" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="0423123456"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="validationCustom01" className="form-label">
                    Email address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="john.doe@gmail.com"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="validationCustom01" className="form-label">
                    Degree
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Bachelor in Computer Science"
                    name="degree"
                    value={formState.degree}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="validationCustom01" className="form-label">
                    Programming Language
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="JavaScript"
                    name="language"
                    value={formState.language}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="validationCustom01" className="form-label">
                    Hourly Rate $
                  </label>
                  <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Amount (to the nearest dollar)"
                      placeholder="30"
                      name="hourRate"
                      value={formState.hourRate}
                      onChange={handleChange}
                      required
                    />
                    <span className="input-group-text">.00</span>
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="validationCustom01" className="form-label">
                    About Me (Short Describtion)
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    placeholder="Your professional describtion and background"
                    name="describtion"
                    value={formState.describtion}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <label htmlFor="validationCustom01" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="validationCustom01"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="invalidCheck"
                      required
                    />
                    <label className="form-check-label" htmlFor="invalidCheck">
                      Agree to terms and conditions
                    </label>
                    <div className="invalid-feedback">
                      You must agree before submitting.
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary" type="submit">
                    Submit form
                  </button>
                </div>
              </form>
              )}

              {error && (
              <div className="my-3 p-3 bg-danger text-white">
                Oooops, something went wrong! Please try again...
              </div>
              )} 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
