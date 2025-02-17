import React, { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import Logo from '../assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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
      className={`navbar navbar-expand-lg navbar-dark header fixed-top ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="container">
        <a
          className="navbar-brand fw-bold"
          href="/home"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            navigate("/"); // Navigate to home page
          }}
        >
          <img width={107} src={Logo} alt="Logo" />
        </a>
        <button
          className="navbar-toggler bg-white"
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
              <a
                className="nav-link"
                href="/" // Change href to match the target ID

              >
                Home
              </a>

            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li class="nav-item mega-menu-dropdown dropdown position-static">
              <a class="nav-link dropdown-toggle" href="" id="megaMenu" role="button">
                Services
              </a>
              <div class="mega-menu">
                <div class="container">
                  <div class="row">
                    <div class="col-md-3">
                      <h6>Category 1</h6>
                      <a class="dropdown-item" href="#">Item 1</a>
                      <a class="dropdown-item" href="#">Item 2</a>
                      <a class="dropdown-item" href="#">Item 3</a>
                    </div>
                    <div class="col-md-3">
                      <h6>Category 2</h6>
                      <a class="dropdown-item" href="#">Item 4</a>
                      <a class="dropdown-item" href="#">Item 5</a>
                      <a class="dropdown-item" href="#">Item 6</a>
                    </div>
                    <div class="col-md-3">
                      <h6>Category 3</h6>
                      <a class="dropdown-item" href="#">Item 7</a>
                      <a class="dropdown-item" href="#">Item 8</a>
                      <a class="dropdown-item" href="#">Item 9</a>
                    </div>
                    <div class="col-md-3">
                      <h6>Category 4</h6>
                      <a class="dropdown-item" href="#">Item 10</a>
                      <a class="dropdown-item" href="#">Item 11</a>
                      <a class="dropdown-item" href="#">Item 12</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Project
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor action
                  document.getElementById("blog-section")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact Us
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' style={{ color: "#F58539" }} href="tel:+916264818989">
                <IoCallOutline /> <span>+91 6264818989</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
