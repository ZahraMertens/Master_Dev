import "./results.css";
import { FaSearch } from "react-icons/fa";
import Banner from "../../assets/images/bannerresult.jpg"

import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_TUTORS } from "../../utils/queries";

import ResultCard from "../../components/ResultCard";

export default function SearchResults() {

  const { language } = useParams();

  const [ newLanguage, setNewLanguage ] = useState("")

  const { loading, data } = useQuery(GET_TUTORS, {
    variables: { language: language },
  });

  const tutors = data?.searchtutor || {};

  console.log(tutors) 

  const handleChange = (event) => {
    const { value } = event.target;

    setNewLanguage(value)
  };
    
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="anothersearch-main">
        <div className="container anothersearch-wrapper">
          <div className="row justify-content-center">
            <div className="col-4">
              <div className="input-group input-group-lg">
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Java Script"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                  name="newLanguage"
                  value={newLanguage}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-2 btn-container-hero">
              <Link
                className="btn btn-light btn-lg anothersearch-btn"
                to={`/results/${newLanguage}`}
              >
                FIND A TUTOR
              </Link>
            </div>
          </div>
        </div>
        <img src={Banner} className="banner-result-img" alt="banner"/>
      </div>
      <div className="results-main">
        <div className="results-wrapper">
          <ResultCard tutors={tutors} language={language}/>
        </div>
      </div>
    </div>
  );
}
