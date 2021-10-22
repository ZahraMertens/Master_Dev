import "./results.css";

export default function Results() {
  return (
    <div>
      <div className="anothersearch-main">
        <div className="anothersearch-wrapper">
          <div className="row justify-content-center">
            <div className="col-4">
              <div className="input-group input-group-lg">
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Java Script"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                />
              </div>
            </div>
            <div className="col-2 btn-container-hero">
              <button
                type="button"
                className="btn btn-lg anothersearch-btn align-start"
              >
                FIND A TUTOR
              </button>
            </div>
          </div>
        </div>
        {/* <!-- <img src="./images/bannerresult.jpg" className="banner-result-img" alt=""> --> */}
      </div>
      <div className="results-main">
        <div className="results-wrapper">
          <div className="results-card">
            <div className="row">
              <div className="col-2">
                {/* <img src="./images/placeholder.jpg" className="profile-img" alt=""> */}
              </div>
              <div className="col-6">
                <h1>Name Name</h1>
                <p>Degree</p>
                <p>Describtion</p>
                <h2>
                  <span>Language:</span> Java Script
                </h2>
                <button className="btn btn-sm btn-warning">
                  View Full Profile
                </button>
              </div>
              <div className="col-4">
                <h1>30 /hr</h1>
                <button className="btn btn-md btn-success">BOOK NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
