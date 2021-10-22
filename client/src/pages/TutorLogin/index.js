//const {loading, data, error } = useQuery(Query from auth.js)
// loading = when accesing to db we track te prgress
// when loading finished loading= false
// data = array of objects of data from db
//error = undefined no error

//Mutation
// const [addProfile, {error, data}] = useMutation(ADD_PROFILE)
//then call function in handle form submit

import "./tutorlogin.css";

export default function TutorLogin() {
  return (
    <div>
      <div class="tutorsignup-main">
        <div class="signup-wrapper">
          <div class="row">
            <div class="col">
              <form class="row">
                <div class="col-12">
                  <h1>Tutor Sign Up</h1>
                </div>
                <div class="col-6">
                  <label for="validationCustom01" class="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom01"
                    value="Mark"
                    required
                  />
                </div>
                <div class="col-6">
                  <label for="validationCustom01" class="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom01"
                    value="Doe"
                    required
                  />
                </div>
                <div class="col-12">
                  <label for="validationCustom01" class="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom01"
                    value="0123123123"
                    required
                  />
                </div>
                <div class="col-12">
                  <label for="validationCustom01" class="form-label">
                    Email address
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom01"
                    value="mark.doe@test.com"
                    required
                  />
                </div>
                <div class="col-12">
                  <label for="validationCustom01" class="form-label">
                    Degree
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom01"
                    value="Master in Computer Science"
                    required
                  />
                </div>
                <div class="col-12">
                  <label for="validationCustom01" class="form-label">
                    Hourly Rate $
                  </label>
                  <div class="input-group mb-3">
                    <span class="input-group-text">$</span>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Amount (to the nearest dollar)"
                    />
                    <span class="input-group-text">.00</span>
                  </div>
                </div>
                <div class="col-12">
                  <label for="validationCustom01" class="form-label">
                    About Me (Short Describtion)
                  </label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="validationCustom01"
                    value="mark.doe@test.com"
                    required
                  ></textarea>
                </div>
                <div class="col-12">
                  <label for="validationCustom01" class="form-label">
                    Create Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="validationCustom01"
                    value="Mark1234"
                    required
                  />
                </div>
                <div class="col-12">
                  <label for="validationCustom01" class="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="validationCustom01"
                    value="Mark1234"
                    required
                  />
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="invalidCheck"
                      required
                    />
                    <label class="form-check-label" for="invalidCheck">
                      Agree to terms and conditions
                    </label>
                    <div class="invalid-feedback">
                      You must agree before submitting.
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <button class="btn btn-primary" type="submit">
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
