import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Navbar = ({ logout, isAuthenticated }) => {
  const guestLinks = () => (
    <Fragment>
      <Link to='/login' role="button" className="btn btn-outline-light me-2">Login</Link>
      <Link to='/register' role="button" className="btn btn-warning">Register</Link>
    </Fragment>
  );

  const authLogout = () => (
    <Fragment>
      <button
        className="nav-link dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {localStorage.getItem('email')}
      </button>
      <ul className="dropdown-menu">
        <a class="dropdown-item" href="/profile">
          Profile
        </a>
        <a class="dropdown-item" onClick={logout} href="/">
          Logout <i class="fa-solid fa-right-from-bracket"></i>
        </a>

      </ul>
    </Fragment>
  );

  const authLinks = () => {
    if (isAuthenticated) {
      return (
        <Fragment>
          <li>
            <Link to='/item-list' className='nav-link px-2 text-white'>List</Link>
          </li>
          <li>
            <Link to='/recommendation' className='nav-link px-2 text-white'>Start Recommendation</Link>
          </li>
          <li>
            <Link to='/wardrobe' className='nav-link px-2 text-white'>Wardrobe</Link>
          </li>
          <li>
            <Link to='/history' className='nav-link px-2 text-white'>History</Link>
          </li>
        </Fragment>
      ) 
    }
  }
  return(
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
            {authLinks() } 
          </ul>


          <div className="text-end">
            {isAuthenticated? authLogout(): guestLinks() }
          </div>
        </div>
      </div>
    </header>
  );

};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);