import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

export default function Navbar(props) {

  let isauth = false;

  //collapse nav bar on link click
  function collapsenavbar(){
    document.getElementById('navbarSupportedContent').classList.toggle("show");
  }

  if (sessionStorage.getItem('userData')) {
    isauth = true;
  }
  const history = useHistory();

  
  return (
    <>
      <div className="navbar-topbar">
        <div className="navbar-topbar-phone"><a className="links" href="tel:123-456-7890">(123)-456-7890</a><a className="links" href="mailto:sweat4fit@gmail.com">sweat4fit@gmail.com</a></div>
        <div className="navbar-topbar-social">

          {isauth == true ? (
            <>
              <Link className="links" to="/userprofile">
                My Account
              </Link>
              <Link onClick={() => window.location.reload(false)} className="links" to="/logout">
                Logout
              </Link>
            </>
            
          ) : (

            <>
              <Link className="links" to="/login">
                Login
              </Link>
              <Link className="links" to="/register">
                Register
              </Link>
            </>
          )}

          <a className="links" href="https://www.facebook.com/" target="_blank">
            <img rel="noreferrer" src="../images/icons/fb.png" alt="" />
          </a>
          <a className="links" href="https://twitter.com/login?lang=en" target="_blank">
            <img rel="noreferrer" src="../images/icons/tweet.png" alt="" />
          </a>
          <a className="links" href="https://www.instagram.com/?hl=en" target="_blank">
            <img rel="noreferrer" src="../images/icons/insta.png" alt="" />
          </a>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="../images/logo/sweat4fit.png" alt="sweat4fir logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul onClick={collapsenavbar} className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/trainers">
                  Trainers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/schedule">
                  Schedule
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactus">
                  Contact Us
                </Link>
              </li>

              {isauth == true  ? (
                <>
                  <li className="nav-item chat-btn">
                    <Link className="nav-link chat-btn-link" to="/chat">
                      Chat
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
