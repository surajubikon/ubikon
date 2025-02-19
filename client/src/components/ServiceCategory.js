import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ServiceCategory() {
  const [services, setServices] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/sub-services/all")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (slug) => {
    navigate(`/services-details/${slug}`);
  };

  // 🟢 Group services by title
  const groupedCategories = services.reduce((acc, service) => {
    const category = service.serviceId?.title || service.title || "Unknown Category"; // Title as category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {});

  return (
    <li
      className="nav-item mega-menu-dropdown dropdown position-static"
      ref={dropdownRef}
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <a className="nav-link dropdown-toggle" role="button">
        Services
      </a>
      <div className={`dropdown-menu mega-menu ${showDropdown ? "show" : ""}`}>
        <div className="container">
          <div className="row">
            {/* 🟢 Loop through grouped categories */}
            {Object.entries(groupedCategories).map(([category, subServices], index) => (
              <div className="col-md-3 mb-4" key={index}>
                {/* 🟠 Title (Category) */}
                <h6 className="mb-3">
                  <Link to={`/service-list/${subServices[0].serviceId?.slug || subServices[0].slug}`}>
                    {category}
                  </Link>
                </h6>

                {/* 🔵 Sub-titles (Sub-services under this title) */}
                {subServices.map((subService, subIndex) => (
                  <p
                    key={subIndex}
                    onClick={() => handleClick(subService.slug)}
                  >
                    {subService.title || "No Sub-title"}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

export default ServiceCategory;
