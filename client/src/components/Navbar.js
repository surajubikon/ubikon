import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import Logo from '../assets/img/logo.png';
import ServiceCategory from './ServiceCategory';


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
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
            <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">About</a></li>

            {/* Services Dropdown */}
            <li 
              className="nav-item mega-menu-dropdown dropdown position-static" 
              ref={dropdownRef} 
              onMouseEnter={() => setShowDropdown(true)} 
              onMouseLeave={() => setShowDropdown(false)}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <a className="nav-link dropdown-toggle" role="button">Services</a>
              <div className={`dropdown-menu mega-menu ${showDropdown ? 'show' : ''}`}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-3"><a className="dropdown-item" href="#">Mobile App Development</a></div>
                    <div className="col-md-3"><a className="dropdown-item" href="#">Website Development</a></div>
                    <div className="col-md-3"><a className="dropdown-item" href="#">E-Commerce Solutions</a></div>
                    <div className="col-md-3"><a className="dropdown-item" href="#">Custom Software Solutions</a></div>
                    <div className="col-md-3"><a className="dropdown-item" href="#">Digital Design Services</a></div>
                    <div className="col-md-3"><a className="dropdown-item" href="#">UI/UX Design Services</a></div>
                    <div className="col-md-3"><a className="dropdown-item" href="#">Digital Marketing Solutions</a></div>
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item"><a className="nav-link" href="#">Project</a></li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => {
                e.preventDefault();
                document.getElementById("blog-section")?.scrollIntoView({ behavior: "smooth" });
              }}>
                Blog
              </a>
            </li>
            <li className="nav-item"><a className="nav-link" href="/contact">Contact Us</a></li>
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
