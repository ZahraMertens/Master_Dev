//const {loading, data, error } = useQuery(Query from auth.js)
// loading = when accesing to db we track te prgress
// when loading finished loading= false
// data = array of objects of data from db
//error = undefined no error

//Mutation
// const [addProfile, {error, data}] = useMutation(ADD_PROFILE)
//then call function in handle form submit

import "./tutorsignup.css";

export default function TutorSignup() {
  return (
    <div>
      <div className="tutorsignup-main">
        <div className="signup-wrapper">
          <div className="row form-tutorsignup">
            <div className="col">
              <form className="row">
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
                    value="Mark"
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
                    value="Doe"
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
                    value="0123123123"
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
                    value="mark.doe@test.com"
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
                    value="Master in Computer Science"
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
                    value="mark.doe@test.com"
                    required
                  ></textarea>
                </div>
                <div className="col-12">
                  <label htmlFor="validationCustom01" className="form-label">
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
                  <label htmlFor="validationCustom01" className="form-label">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
