import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => (
    <div className="px-4 pt-5 my-5 text-center border-bottom">
    <h1 className="display-4 fw-bold">Outfit Recommendation System</h1>
    <div className="col-lg-6 mx-auto">
      <p className="lead mb-4"></p>
      <div class="d-grid gap-2 mb-5">
        <Link to='/login' role="button" className="btn btn-dark">Login</Link>
      </div>
    </div>
  </div>
);

export default Home;

