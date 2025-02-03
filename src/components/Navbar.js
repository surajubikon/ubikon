import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Logo from '../assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light header fixed-top ${
        scrolled ? 'scrolled' : ''
      }`}
    >
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          <img width={107} src={Logo} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#home">
                 Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                 About 
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Services 
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Project
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Blog
              </a>
            </li>
            {/* <li className="nav-item">
              <Link to="dashboard">Dashboard</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
