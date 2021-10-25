import "./studentsignup.css";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_STUDENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

export default function StudentSignup() {

  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: "Student",
  });

  const [addStudent, { error, data }] = useMutation(ADD_STUDENT);

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
      const { data } = await addStudent({
        variables: { ...formState },
      });

      Auth.login(data.addStudent.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="studentsignup-main">
        <div className="signup-wrapper">
          <div className="row form-studentsignup">
            <div className="col">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form className="row" onSubmit={handleFormSubmit}>
                <div className="col-12">
                  <h1>Student Sign Up</h1>
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
                {/* <div className="col-12">
                  <label htmlFor="validationCustom01" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    required
                  />
                </div> */}
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
