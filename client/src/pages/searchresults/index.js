import "./results.css";

import React from 'react';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_TUTORS } from "../../utils/queries";

import ResultCard from "../../components/ResultCard";

export default function Results() {

  const { language } = useParams();

  const { loading, data } = useQuery(GET_TUTORS, {
    variables: { language: language },
  });

  const tutors = data?.searchtutor || {};

  console.log(tutors) // gives {}
  
  if (loading) {
    return <div>Loading...</div>;
  }
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
              <Link
                className="btn btn-lg btn-search-hero align-start"
                to={`/results/${language}`}
              >
                FIND A TUTOR
              </Link>
            </div>
          </div>
        </div>
        {/* <!-- <img src="./images/bannerresult.jpg" className="banner-result-img" alt=""> --> */}
      </div>
      <div className="results-main">
        <div className="results-wrapper">
          <ResultCard tutors={tutors}/>
        </div>
      </div>
    </div>
  );
}
