import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function BookFrom({ tutor }) {

    const [rate, setRate] = useState("")

    const handleChange = (event) => {

        const checked = event.target.checked;

        const checkedValue = event.target.value;

        console.log(checkedValue)

        setRate(checkedValue)
    }


  return (
    <div className="col">
      <h1>
        <i className="fas fa-dollar-sign"></i> 
        {rate}
      </h1>
      <form>
        <input
          className="form-check-input"
          type="radio"
          id="flexRadioDefault1"
          name="hour"
          value={tutor.hourRate}
          onChange={this.handleChange}
          checked
          required
        />
        <label className="form-check-label" for="flexRadioDefault1">
          One hour Session
        </label>
        <input
          className="form-check-input"
          type="radio"
          name="five"
          id="flexRadioDefault1"
          onChange={this.handleChange}
          value={tutor.fiveRate}
          required
        />
        <label className="form-check-label" for="flexRadioDefault1">
          Five hour session
        </label>
        <input
          className="form-check-input"
          type="radio"
          name="day"
          id="flexRadioDefault1"
          onChange={this.handleChange}
          value={tutor.dayRate}
          required
        />
        <label className="form-check-label" for="flexRadioDefault1">
          Full Day Session
        </label>
        <Link 
            classNameName="btn btn-ld btn-warning" 
            to={`/book/${tutor.id}/${handleChange}`}>
          <i classNameName="fas fa-shopping-cart"></i> BOOK A SESSION
        </Link>
      </form>
    </div>
  );
}
