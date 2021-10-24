import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_STUDENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

import "./loginstudent.css";

export default function LoginStudent() {
    const [formState, setFormState] = useState({ email: '', password: '' });
  
    const [login, { error, data }] = useMutation(LOGIN_STUDENT);
  
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
        const { data } = await login({
          variables: { ...formState },
        });
  
        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }
  
      // clear form values
      setFormState({
        email: '',
        password: '',
      });
    };


  return (
    <div className="loginstudent-main">
      <div className="loginstudent-wrapper">
        <div className="row">
          <div className="col">
            <h1 className="header-login">Student Login:</h1>
            <form onSubmit={handleFormSubmit}>
              <label className="form-label label-login">
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
              <label className="form-label label-login">
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
          </div>
        </div>
      </div>
    </div>
  );
}