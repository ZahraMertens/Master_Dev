import React from "react";
import "./loading.css";

import LoadingImg from "../../assets/images/loading.gif"

export default function Loading() {
  return (
  <div className="loading">
    <img src={LoadingImg} className="loading-img" alt="loading" />
  </div>
  );
}