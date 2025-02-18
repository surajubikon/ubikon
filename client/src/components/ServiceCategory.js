import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import { Link } from "react-router-dom";

function ServiceCategory() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();  // Hook to navigate programmatically

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:8000/api/sub-services/all')
      .then(response => {
        setServices(response.data); // Assuming the API returns an array of services
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }, []);

  const handleClick = (slug) => {
    // Navigate to the service details page with the slug
    navigate(`/services-details/${slug}`);
  };

  // Group services by their title (assuming title is the category)
  const groupedCategories = services.reduce((acc, service) => {
    const category = service.title; // Use title as the category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {});

  return (
    <li className="nav-item mega-menu-dropdown dropdown position-static">
      <a className="nav-link dropdown-toggle" href="" id="megaMenu" role="button">
        Services
      </a>
      <div className="mega-menu">
        <div className="container">
          <div className="row">
            {/* Map over each service */}
            {services.map((service, index) => (
              <div className="col-md-3" key={index}>
                {/* <h6>{service.serviceId?.title || 'Unknown Category'}</h6> */}
                <Link to= {`/service-list/${service.serviceId?.title}`}>
                                            {service.serviceId?.title || "No Title"}
                                        </Link>
                 {/* Display the title of the service */}
                <p
                  onClick={() => handleClick(service.slug)} // Handle click to redirect using slug
                  style={{ cursor: 'pointer' }}
                >
                  {service.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

export default ServiceCategory;
