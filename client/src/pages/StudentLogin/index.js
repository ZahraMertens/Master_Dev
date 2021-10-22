import "./studentlogin.css";

export default function StudentLogin() {
  return (
    <div>
      <div class="studentsignup-main">
        <div class="signup-wrapper">
          <div class="row">
            <div class="col">
              <form class="row">
                <div class="col-12">
                  <h1>Student Sign Up</h1>
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
                    mail address
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
