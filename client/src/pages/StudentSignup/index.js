import "./studentsignup.css";

export default function StudentSignup() {
  return (
    <div>
      <div className="studentsignup-main">
        <div className="signup-wrapper">
          <div className="row">
            <div className="col">
              <form className="row">
                <div className="col-12">
                  <h1>Student Sign Up</h1>
                </div>
                <div className="col-6">
                  <label for="validationCustom01" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    value="Mark"
                    required
                  />
                </div>
                <div className="col-6">
                  <label for="validationCustom01" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    value="Doe"
                    required
                  />
                </div>
                <div className="col-12">
                  <label for="validationCustom01" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    value="0123123123"
                    required
                  />
                </div>
                <div className="col-12">
                  <label for="validationCustom01" className="form-label">
                    mail address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    value="mark.doe@test.com"
                    required
                  />
                </div>
                <div className="col-12">
                  <label for="validationCustom01" className="form-label">
                    Create Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="validationCustom01"
                    value="Mark1234"
                    required
                  />
                </div>
                <div className="col-12">
                  <label for="validationCustom01" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="validationCustom01"
                    value="Mark1234"
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
                    <label className="form-check-label" for="invalidCheck">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
