import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";

export default function TutorModal({tutor, show, handleClose}) {

    const [formState, setFormState] = useState({
        firstName: `${tutor.firstName}`,
        lastName: `${tutor.lastName}`,
        email: `${tutor.email}`,
        password: `${tutor.password}`,
        phone: `${tutor.phone}`,
        describtion: `${tutor.describtion}`,
        language: `${tutor.language}`,
        degree: `${tutor.degree}`,
        hourRate: `${tutor.hourRate}`,
        filenameImg: `${tutor.filenameImg}`,
        userType: "Tutor",
      });

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row">
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
                    // onChange={handleChange}
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
                    // onChange={handleChange}
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
                    // onChange={handleChange}
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
                    // onChange={handleChange}
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
                    // onChange={handleChange}
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
                    // onChange={handleChange}
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
                    //   onChange={handleChange}
                      required
                    />
                    <span className="input-group-text">.00</span>
                  </div>
                </div>
                {/* <FileUpload handleUpload={handleUpload} /> */}
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
                    // onChange={handleChange}
                    required
                  ></textarea>
                </div>
                {/* <div className="col-12">
                  <label htmlFor="validationCustom01" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="validationCustom01"
                    name="password"
                    value={formState.password}
                    // onChange={handleChange}
                    required
                  />
                </div> */}
                <div className="col-12">
                  <button className="btn btn-primary" type="submit">
                    Submit form
                  </button>
                </div>
              </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
