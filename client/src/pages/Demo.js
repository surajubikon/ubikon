import React from "react";
import careerBg from "../assets/img/career-bg.jpg"; // Local image import
import newSectionImage from "../assets/img/new-section.png"; // New section image import
import { FaMapMarkerAlt } from "react-icons/fa"; // Importing location icon

const Banner = () => {
  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center text-white text-center p-5 rounded shadow-lg"
        style={{
          backgroundImage: `url(${careerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "290px",
        }}
      >
        <h1 className="fw-bold mb-2">Design the Future</h1>
        <p className="lead mb-4">Create stunning products with intuitive design solutions.</p>
        <button className="btn btn-primary fw-semibold shadow" style={{ fontSize: "14px", borderRadius: "0" }}>
          Get Started
        </button>
      </div>

      <div className="container">
        <div className="d-flex justify-content-center mt-5 col-md-8 m-auto">
          <img src={newSectionImage} alt="New Section" style={{ width: "1110px", height: "400px" }} />
        </div>
      </div>

      {/* Product Designer Section */}
      <div className="container mt-5">
        <div className="row">
          {/* Left Side Content */}
          <div className="col-md-8">
            <h2 className="fw-bold">Product Designer</h2>
            <div className="mt-3">
              <h4>Responsibilities</h4>
              <ul>
                <li>Develop user-centered designs</li>
                <li>Collaborate with product teams</li>
                <li>Conduct usability testing</li>
                <li>Create wireframes and prototypes</li>
              </ul>
            </div>
          </div>
          {/* Right Side Button */}
          <div className="col-md-4">
            <button className="btn btn-primary">Apply Now</button>
            {/* Location Section */}
            <div className="row mt-4">
              <div className="col-md-2 d-flex align-items-center">
                <FaMapMarkerAlt size={24} color="gray" />
              </div>
              <div className="col-md-10">
                <h5 className="text-muted">Location</h5>
                <p>123 Main Street, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Banner;
