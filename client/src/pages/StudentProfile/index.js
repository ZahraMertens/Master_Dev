import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { STUDENT_BY_ID } from "../../utils/queries";
import { UPDATE_STUDENT } from "../../utils/mutations";

import Auth from '../../utils/auth';

import "./studentProfile.css";
import { FaUser } from "react-icons/fa";

// import Auth from "../../utils/auth";

export default function StudentProfile () {
  const { studentId } = useParams();
  console.log(studentId);

  const { loading, data } = useQuery(STUDENT_BY_ID, {
    variables: { studentId: studentId },
  });

  const student = data?.onestudent || {};

  console.log(student);

  //Use Effect runs whenever any state changes
  useEffect(()=> {
    console.log("Student Changed", data?.onestudent)
    if(data?.onestudent){
      setFormState({
        studentId: studentId,
        firstName: `${student.firstName}`,
        lastName: `${student.lastName}`,
        email: `${student.email}`,
        password: "",
      })
    }
  },[data?.onestudent]);

  const [formState, setFormState] = useState({
    studentId: studentId,
    firstName: ``,
    lastName: ``,
    email: ``,
    password: ``,
  });

  const [updateStudent, { error }] = useMutation(UPDATE_STUDENT);

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
      const { data } = await updateStudent({
        variables: { ...formState },
      });

      Auth.login(data.updateStudent.token);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="studentProfile-main">
      <div className="studentProfile-wrapper">
        <div className="row justify content-center">
          <div className="col">
            <h1>My Account</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FaUser size={70} />
          </div>
        </div>
        <form className="row form-student" onSubmit={handleFormSubmit}>
          <div className="col-12">
            <label
              htmlFor="validationCustom01"
              className="form-label student-label  student-label"
            >
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
          <div className="col-12">
            <label htmlFor="validationCustom01" className="form-label student-label">
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
            <label htmlFor="validationCustom01" className="form-label student-label">
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
            <label htmlFor="validationCustom01" className="form-label student-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="validationCustom01"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary btn-student" type="submit">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
