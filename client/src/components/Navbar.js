import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import Logo from '../assets/img/logo.png';
import ServiceCategory from './ServiceCategory';


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };



    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark header fixed-top p-0 ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand fw-bold" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
          <img width={107} src={Logo} alt="Logo" />
        </a>

        {/* Mobile Toggle Button */}
        <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link></li>
            <ServiceCategory />
          <li className="nav-item"><a className="nav-link" href="#">Project</a></li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog-all-list">Blog</Link>
              </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
            <li className="nav-item">
              <Link className="nav-link" to="/careerdetails">Careers</Link>
              </li>
            <li className="nav-item">
              <a className="nav-link" style={{ color: "#F58539" }} href="tel:+916264818989">
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
