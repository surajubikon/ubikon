import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import careerBg from "../assets/img/career-bg.jpg"; // Local image import
import newSectionImage from "../assets/img/new-section.png"; // New section image import
import { FaMapMarkerAlt } from "react-icons/fa"; // Importing location icon
import { GoDotFill } from "react-icons/go";
import { PiBagSimpleFill } from "react-icons/pi";
import { MdDateRange } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { FaClock } from "react-icons/fa";







const Banner = () => {
  return (
    <> 
      
      <Navbar />

      <div className="product-designer-dt">
       
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
          <button className="default-btn shadow" style={{ fontSize: "14px", borderRadius: "0" }}>
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
              <h2 className="fw-bold mb-5">PRODUCT DESIGNER</h2>
              <div className="mt-3 mb-5">
                <h4 className="fw-bold mb-4">Who Are We Looking For</h4>
                <ul className="list-unstyled small">
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> Develop user-centered designs</li>
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> Collaborate with product teams</li>
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> Conduct usability testing</li>
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> Create wireframes and prototypes</li>
                </ul>
              </div>
              <div className="mt-3 mb-5">
                <h4 className="fw-bold mb-4">What You Will Be Doing</h4>
                <ul className="list-unstyled small">
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> Develop user-centered designs</li>
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> Collaborate with product teams</li>
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> Conduct usability testing</li>
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> Create wireframes and prototypes</li>
                </ul>
              </div>
              <div className="mt-3 mb-5">
                <h4 className="fw-bold mb-4">Bonus Points for Familiarity with</h4>
                <ul className="list-unstyled small">
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> Develop user-centered designs</li>
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> Collaborate with product teams</li>
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> Conduct usability testing</li>
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> Create wireframes and prototypes</li>
                </ul>
              </div>
              <div className="mt-3 mb-5">
                <h4 className="fw-bold mb-4">Educational Requirement</h4>
                <div className="small">
                  <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going</p>
                </div>
              </div>
              <div className="mt-3 mb-5">
                <h4 className="fw-bold mb-4">Salary</h4>
                  <ul className="list-unstyled small">
                    <li className="mb-2"><span className="me-3"><GoDotFill /></span> Salary:  18,000 to 35,000 BDT (Depends on Skill and Experience)</li>
                    <li className="mb-2"><span className="me-3"><GoDotFill /></span> Salary Review: Yearly</li>
                  </ul>
              </div>
              <div className="mt-3 mb-5">
                <h4 className="fw-bold mb-4">Working Hours</h4>
                <ul className="list-unstyled small">
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> 8 AM – 5 PM</li>
                </ul>
              </div>
              <div className="mt-3 mb-5">
                <h4 className="fw-bold mb-4">Working Days</h4>
                <ul className="list-unstyled small">
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> Weekly: 5 days.</li>
                  <li className="mb-2"><span className="me-3"><GoDotFill /></span> Weekend: Friday.Saturday</li>
                </ul>
              </div>
            </div>
            {/* Right Side Button */}
            <div className="col-md-4">
              <div className="card m-0">
                <div className="card-body">
                  <div className="text-center">  <button className="default-btn mt-4">Apply Now</button> </div>

                  <div className="mt-5">
                    <h5 className="fw-bold mb-3">Job Summary</h5>
                    {/* Location Section */}
                    <div className="row mb-5">
                      <div className="col-md-2 d-flex align-items-center">
                        <FaMapMarkerAlt size={48} color="gray" />
                      </div>
                      <div className="col-md-10 ps-0">
                        <p className="text-secondary mb-0">Location</p>
                        <p className="mb-0 small">123 Main Street, New York, NY 10001</p>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-2 d-flex align-items-center">
                        <PiBagSimpleFill size={48} color="gray" />
                      </div>
                      <div className="col-md-10 ps-0">
                        <p className="text-secondary mb-0">Job Type</p>
                        <p className="mb-0 small">Full Time</p>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-2 d-flex align-items-center">
                        <MdDateRange  size={48} color="gray" />
                      </div>
                      <div className="col-md-10 ps-0">
                        <p className="text-secondary mb-0">Date posted</p>
                        <p className="mb-0 small">posted 1 month ago</p>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-2 d-flex align-items-center">
                        <FaClock  size={48} color="gray" />
                      </div>
                      <div className="col-md-10 ps-0">
                        <p className="text-secondary mb-0">Experience</p>
                        <p className="mb-0 secondary">Experience: 1-3 year</p>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-2 d-flex align-items-center">
                        <FaMapMarkerAlt size={48} color="gray" />
                      </div>
                      <div className="col-md-10 ps-0">
                        <p className="text-secondary mb-0">Working Hours</p>
                        <p className="mb-0 small">9 AM - 6 PM</p>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-2 d-flex align-items-center">
                        <FaMapMarkerAlt size={48} color="gray" />
                      </div>
                      <div className="col-md-10 ps-0">
                        <p className="text-secondary mb-0">Working Days</p>
                        <p className="mb-0 small">Weekly:5days</p>
                        <p className="mb-0 small">Weekend: Saturday,Sunday</p>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-2 d-flex align-items-center">
                        <FaMapMarkerAlt size={48} color="gray" />
                      </div>
                      <div className="col-md-10 ps-0">
                        <p className="text-secondary mb-0">Vacancy</p>
                        <p className="mb-0 small">Experience: 1-3 year</p>
                      </div>
                    </div>

                    <div className=""><a href="" className="fw-bold border-bottom text-dark">View all job</a></div>
                  </div>  
                </div>  
              </div>  
            </div>
          </div>

        </div>
      </div>  
    <Footer />      
    </>
  );
};

export default Banner;
