import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import careerBg from "../assets/img/career-bg.jpg"; // Local image import

import benefit1 from "../assets/img/benefit1.png";
import benefit2 from "../assets/img/benefit2.png";
import benefit3 from "../assets/img/benefit3.png";
import benefit4 from "../assets/img/benefit4.png";

const Career = () => {
  return (
    <div className="career-section">
      {/* Banner Section */}
      <div
        className="position-relative text-white text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${careerBg})`, // Using imported image
          height: "400px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
        <div className="position-relative col-md-5 m-auto">
          <h1 className="fw-bold">Join Us</h1>
          <p className="small">Explore exciting career opportunities and grow with us.</p>
        </div>
      </div>

      <div className="benefits-section py-5">
  <div className="container">
    <div className="row">
      {/* Left Section */}
      <div className="col-md-5">
        <p className="fw-semibold">Benefits</p>
        <h2 className="fw-bold">Why you Should Join Our Awesome Team</h2>
        <p className="text-muted">
        we want to feel like home when you are working at Ubikon technology pvt ltd & for that we have curated a great set of benefits for you.It all starts with the free lunch!
        </p>
      </div>

      {/* Right Section */}
      <div className="col-md-7">
        <div className="row g-4">
          {/* Benefit 1 */}
          <div className="col-md-6">
            <div className="p-3 shadow-sm rounded text-start benefit-card">
              <div className="benefit-img-wrapper benefit-1">
                <img src={benefit1} alt="Benefit 1" className="img-fluid rounded" />
              </div>
              <h5 className="fw-semibold mt-3">Team work</h5>
              <p className="text-muted">Work at your own pace with our flexible schedules.</p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="col-md-6">
            <div className="p-3 shadow-sm rounded text-start benefit-card">
              <div className="benefit-img-wrapper benefit-2">
                <img src={benefit2} alt="Benefit 2" className="img-fluid rounded" />
              </div>
              <h5 className="fw-semibold mt-3">Secured Future</h5>
              <p className="text-muted">Advance your career with our development programs.</p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="col-md-6">
            <div className="p-3 shadow-sm rounded text-start benefit-card">
              <div className="benefit-img-wrapper benefit-3">
                <img src={benefit3} alt="Benefit 3" className="img-fluid rounded" />
              </div>
              <h5 className="fw-semibold mt-3">Learning Opportunity</h5>
              <p className="text-muted">Enjoy a healthy work-life balance with us.</p>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="col-md-6">
            <div className="p-3 shadow-sm rounded text-start benefit-card">
              <div className="benefit-img-wrapper benefit-4">
                <img src={benefit4} alt="Benefit 4" className="img-fluid rounded" />
              </div>
              <h5 className="fw-semibold mt-3">Upgrate Skills</h5>
              <p className="text-muted">Be part of a collaborative and friendly team.</p>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>

  {/* Custom CSS */}
  <style>{`
    .benefit-img-wrapper {    
      display: inline-block;
      padding: 11px;
    }
    .benefit-img-wrapper .img-fluid {
        width:33px;
    }
    .benefit-img-wrapper.benefit-1 {
      background-color: #E7F2FF;
    }
    .benefit-img-wrapper.benefit-2 {
      background-color: #F1F7E8;
    }
    .benefit-img-wrapper.benefit-3 {
      background-color: #EFF2F5;
    }
    .benefit-img-wrapper.benefit-4 {
      background-color: #FFEEED;
    }
  `}</style>
</div>

<div className="careers-section py-5" style={{ backgroundColor: "#E7F7FF" }}>
  <div className="container">
    {/* Heading */}
    <p className="text-center fw-semibold mb-3">Come join us</p>
    <h2 className="fw-bold text-center">Career Openings</h2>
    <p className="text-muted text-center">Find your next opportunity with us</p>
    
    <div className="col-md-10 mx-auto">
      <div className="row mt-4">
        {/* Left Section - Job Categories */}
        <div className="col-md-3">
          <ul className="list-group border-0 bg-transparent">
            <li className="list-group-item border-0 bg-transparent">HT & Admin</li>
            <li className="list-group-item border-0 bg-transparent">Engineering (20)</li>
            <li className="list-group-item border-0 bg-transparent">Support</li>
            <li className="list-group-item border-0 bg-transparent">Design</li>
            <li className="list-group-item border-0 bg-transparent">Digital Marketing</li>
          </ul>
        </div>

        {/* Right Section - Job Listings */}
        <div className="col-md-9">
          <div className="row g-3">
            {/* Job Cards */}
            {[ 
              { title: "Software Engineer", type: "Full-Time", location: "New York, USA", experience: "3+ Years" },
              { title: "Product Designer", type: "Full-Time", location: "Remote", experience: "2+ Years" },
              { title: "Marketing Manager", type: "Full-Time", location: "San Francisco, USA", experience: "5+ Years" },
              { title: "Customer Support Specialist", type: "Part-Time", location: "Remote", experience: "1+ Years" }
            ].map((job, index) => (
              <div className="col-12" key={index}>
                <div className="p-3 shadow-sm rounded bg-light d-flex flex-row justify-content-between align-items-center">
                  <h5 className="fw-semibold me-3">{job.title}</h5>
                  <div>
                    <p className="text-muted me-3 mb-0">{job.type}</p>
                    <h6 className="fw-semibold me-3">Location</h6>
                  </div>
                  <div>
                    <p className="text-muted me-3 mb-0">{job.location}</p>
                    <h6 className="fw-semibold me-3">Experience</h6>
                  </div>  
                  <p className="text-muted">{job.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>






      
    </div>
  );
};

export default Career;
