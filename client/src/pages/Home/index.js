import "./home.css";

import Video from "../../assets/images/e-learning-app-ad-copy.mp4"
import Works1 from "../../assets/images/howitworks1.png"
import Works2 from "../../assets/images/howitworks2.png"
import Works3 from "../../assets/images/howitworks3.png"
import WhyUs from "../../assets/images/whyus2.png"


export default function Home() {
  return (
    <div>
      <div id="search" class="hero-main">
        <div class="hero-wrapper">
          <div class="row justify-content-center align-middle">
            <div class="header1">
              <div class="row justify-content-center align-middle">
                <div class="col">
                  <h1>Let us help you to become a master in web development</h1>
                </div>
              </div>
              <div class="row justify-content-center align-middle">
                <div class="col">
                  <h1>And find the perfect online tutor for you today</h1>
                </div>
              </div>
              <div class="row justify-content-center align-middle">
                <div class="col">
                  <p>Affordable one-on-one tutition</p>
                </div>
              </div>
              <div class="row justify-content-center align-middle">
                <div class="col-4 search-hero">
                  <div class="input-group input-group-lg">
                    <span class="input-group-text" id="inputGroup-sizing-lg">
                      <i class="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-lg"
                    />
                  </div>
                </div>
                <div class="col-2 btn-container-hero">
                  <button
                    type="button"
                    class="btn btn-lg btn-search-hero align-start"
                  >
                    FIND A TUTOR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="advert-main">
        <div class="advert-wrapper">
          <div class="row">
            <div class="col">
              <video class="advert-video" controls>
                <source
                  src={Video}
                  type="video/mp4"
                />
                <source src="movie.ogg" type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="col justify-content-center">
              <div class="row text-advert-container">
                <div class="col-6">
                  <h1>Improve your coding skills with online tutoring</h1>
                  <p>
                    E learning gives the student and tutor more flexibility.
                    With Master Dev you have access to the best tutors in the
                    business who can help you to improve your skills, further
                    your knowldege and find bugs & resolve issues from the
                    comfort of your own home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="how-itworks-main">
        <div class="howitworks-wrapper">
          <div class="row justify-content-center">
            <div class="col">
              <h1 class="howitworks-header">How it works</h1>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col">
              <img
                class="howitworks-img"
                src={Works1}
                alt=""
              />
            </div>
            <div class="col">
              <h1 class="howitworks-section-header">
                Search for a tutor by your prefered programming language
              </h1>
              <p>
                There are hundreds of web developer tutors who are ready and
                willing to help you to become a master developer.
              </p>
              <p>
                Browse for your prefered programming language and find the
                perfect tutor based on your requirements.
              </p>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col">
              <h1 class="howitworks-section-header">Book a session</h1>
              <p>
                View the the tutors profile and if you like what the tutor has
                to offer click on the 'book now' button and book a session.
              </p>
            </div>
            <div class="col">
              <img
                class="howitworks-img"
                src={Works2}
                alt=""
              />
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col">
              <img
                class="howitworks-img"
                src={Works3}
                alt=""
              />
            </div>
            <div class="col">
              <h1 class="howitworks-section-header">
                Your journey to become a tech master starts now!
              </h1>
              <p>
                Start learning, improve your skills, solve issues and learn from
                experienced web developers!
              </p>
              <a href="#search">
                <button type="button" class="btn btn-lg btn-getstarted">
                  Get started!
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="benefits-main">
        <div class="benefits-wrapper">
          <div class="row justify-content-center">
            <div class="col">
              <h1 class="whyus-header">Why us?</h1>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col">
              <div class="row">
                <div class="col">
                  <h1>one-on-one tutoring</h1>
                  <p>
                    Allows the student to ask specific questions and the tutor
                    can concentrate on your concerns
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <h1>Screen Sharing</h1>
                  <p>
                    Show your real time work and allow the tutor to inspect your
                    code in detail and work on it at the same time.
                  </p>
                </div>
              </div>
            </div>
            <div class="col">
              <img class="whyus-img" src={WhyUs} alt="Why us" />
            </div>
            <div class="col">
              <div class="row">
                <div class="col">
                  <h1>Screen Sharing</h1>
                  <p>
                    Show your real time work and allow the tutor to inspect your
                    code in detail and work on it at the same time.
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <h1>Screen Sharing</h1>
                  <p>
                    Show your real time work and allow the tutor to inspect your
                    code in detail and work on it at the same time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="startnow-main">
        <div class="startnow-wrapper">
          <div class="row align-items-center">
            <div class="col student-container">
              <h1>Student</h1>
              <ul>
                <li>Online access 24x7</li>
                <li>Starts from 20$</li>
                <li>Learn any language from home</li>
              </ul>
              <button type="button" class="btn signup-btn">
                SIGN UP
              </button>
            </div>
            <div class="col tutor-container">
              <h1>Tutor</h1>
              <ul>
                <li>
                  Freedom and flexibility to set your own hours and payment
                </li>
                <li>Get paid straight and save into your bank account</li>
                <li>Work from home</li>
              </ul>
              <button type="button" class="btn signup-btn">
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
