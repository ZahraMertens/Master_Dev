import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";

import { Modal, Button } from "react-bootstrap";
import Auth from "../../utils/auth"
import { UPDATE_STUDENT } from "../../utils/mutations";

export default function StudentModal({ student, show, handleClose }) {
  console.log(student);

  const [updateStudent, {error}] = useMutation(UPDATE_STUDENT)

  const [formState, setFormState] = useState({
    studentId: `${student._id}`,
    firstName: `${student.firstName}`,
    lastName: `${student.lastName}`,
    email: `${student.email}`,
    password: "",
  });

  console.log(formState)

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState.language);

    try {
      const { data } = await updateStudent({
        variables: { ...formState },
      });

      Auth.login(data.updateStudent.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row" onSubmit={handleFormSubmit}>
            <div className="col-12">
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
            <div className="col-12">
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
                placeholder=""
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Update Profile
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}