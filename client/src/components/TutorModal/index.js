import { useMutation } from "@apollo/client";
import React, { useState } from "react";

import FileUpload from "../FileUpload/index"

import { Modal, Button } from "react-bootstrap";
import Auth from "../../utils/auth"
import { UPDATE_TUTOR } from "../../utils/mutations";

export default function TutorModal({ tutor, show, handleClose }) {

  const [updateTutor, {error}] = useMutation(UPDATE_TUTOR)

  const [formState, setFormState] = useState({
    tutorId: `${tutor._id}`,
    firstName: `${tutor.firstName}`,
    lastName: `${tutor.lastName}`,
    email: `${tutor.email}`,
    phone: `${tutor.phone}`,
    description: `${tutor.description}`,
    language: `${tutor.language}`,
    degree: `${tutor.degree}`,
    hourRate: `${tutor.hourRate}`,
    filenameImg: `${tutor.filenameImg}`,
    zoomPMI: `${tutor.zoomPMI}`,
    zoomPass: `${tutor.zoomPass}`,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateTutor({
        variables: { ...formState },
      });

      Auth.login(data.updateTutor.token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAWS = async (filenameImg) => {
    await setFormState({
      ...formState,
      filenameImg: filenameImg.filenameImg ? filenameImg.filenameImg : formState.filenameImg
    })
  }

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
                Zoom URLfor Private Meetings
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                placeholder="JavaScript"
                name="language"
                value={formState.zoomPMI}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <label htmlFor="validationCustom01" className="form-label">
                Zoom Meeting Password
              </label>
              <input
                type="password"
                className="form-control"
                id="validationCustom01"
                placeholder="JavaScript"
                name="language"
                value={formState.zoomPass}
                onChange={handleChange}
                required
              />
            </div>
            <FileUpload handleAWS={handleAWS} />
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
                placeholder="Your professional description and background"
                name="description"
                value={formState.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="col-12">
              <button className="btn btn-primary update-tutor-btn" type="submit">
                Submit form
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
