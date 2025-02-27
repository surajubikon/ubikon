import { React, useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import careerBg from "../assets/img/career-bg.jpg"; // Local image import
import { Link } from "react-router-dom";
import benefit1 from "../assets/img/benefit1.png";
import benefit2 from "../assets/img/benefit2.png";
import benefit3 from "../assets/img/benefit3.png";
import benefit4 from "../assets/img/benefit4.png";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate


import Navbar from '../components/Navbar';

import Footer from '../components/Footer';
import culture1 from "../assets/img/culture1.png";
import culture2 from "../assets/img/culture2.png";
import culture3 from "../assets/img/culture3.png";
import culture4 from "../assets/img/culture4.png";
import work1 from "../assets/img/work1.png";
import work2 from "../assets/img/work2.png";
import work3 from "../assets/img/work3.png";
import work4 from "../assets/img/work4.png";
import events1 from "../assets/img/events1.png";
import events2 from "../assets/img/events2.png";
import events3 from "../assets/img/events3.png";
import events4 from "../assets/img/events4.png";
import team1 from "../assets/img/team1.png";
import team2 from "../assets/img/team2.png";
import team3 from "../assets/img/team3.png";
import team4 from "../assets/img/team4.png";
import ActivityPage from "./ActivityPage";

const Career = () => {
  const [selectedTab, setSelectedTab] = useState("defaultTab");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobCategories, setJobCategories] = useState([]);
  const [jobListings, setJobListings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // ✅ useNavigate Hook

  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        const response = await axios.get("https://ubikon.in/api/jobCategory/get-job");
        setJobCategories(response.data);

        // 🔹 Check if there is a saved category in localStorage
        const storedCategory = localStorage.getItem("selectedCategory");

        if (storedCategory && response.data.some(cat => cat._id === storedCategory)) {
          setSelectedCategory(storedCategory);
          fetchJobs(storedCategory); // Fetch jobs for saved category
        } else if (response.data.length > 0) {
          setSelectedCategory(response.data[0]._id); // Select first category by default
          fetchJobs(response.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching job categories:", error);
      }
    };

    fetchJobCategories();
  }, []);
  const fetchJobs = async (categoryId) => {
    try {
      const response = await axios.get(`https://ubikon.in/api/jobCollection/get-jobcollection/${categoryId}`);
      setJobListings(response.data);
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("No jobs found for this category.");
      } else {
        console.error("Error fetching job listings:", error);
        setErrorMessage("Something went wrong while fetching jobs.");
      }
      setJobListings([]);
    }
  };

  // 🟢 Category Change Handler
  // const handleCategoryClick = (categoryId) => {
  //     setSelectedCategory(categoryId);
  //     localStorage.setItem("selectedCategory", categoryId);
  //     fetchJobs(categoryId); // 🔥 Same function reuse ho raha hai
  // };

  // 🟢 Load Selected Category on First Render
  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    if (storedCategory) {
      setSelectedCategory(storedCategory);
      fetchJobs(storedCategory);
    }
  }, []);
  const handleJobClick = (job) => {
    navigate("/job-req", { state: { jobData: job } });
  };
  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    localStorage.setItem("selectedCategory", categoryId);
    setErrorMessage("");

    try {
      const response = await axios.get(`https://ubikon.in/api/jobCollection/get-jobcollection/${categoryId}`);
      setJobListings(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("No jobs found for this category.");
      } else {
        console.error("Error fetching job listings:", error);
        setErrorMessage("Something went wrong while fetching jobs.");
      }
      setJobListings([]);
    }
  };

  return (
    <>
      <Navbar />
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

        </div>

        <div className="careers-section py-5" style={{ backgroundColor: "#E7F7FF" }}>
          <div className="container">
            <div className="col-md-6 mx-auto mb-5">
              <p className="text-center fw-semibold mb-3">Come join us</p>
              <h2 className="fw-bold text-center">Career Openings</h2>
              <p className="text-muted text-center">
                We’re always looking for creative, talented self-starters. Check out our open roles below.
              </p>
            </div>

            <div className="col-md-10 mx-auto">
              <div className="row mt-4">
                <div className="col-md-3">
                  <ul className="list-group border-0 bg-transparent">
                    {jobCategories.length > 0 ? (
                      jobCategories.map((category) => (
                        <li
                          key={category._id}
                          className={`list-group-item border-0 bg-transparent ${selectedCategory === category._id ? "fw-bold text-primary" : ""}`}
                          onClick={() => handleCategoryClick(category._id)}
                          style={{ cursor: "pointer" }}
                        >
                          {category.name} {category.jobCount ? `(${category.jobCount})` : ""}
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item border-0 bg-transparent">Loading...</li>
                    )}
                  </ul>
                </div>

                <div className="col-md-9">
                  {errorMessage ? (
                    <p className="text-center text-danger">{errorMessage}</p>
                  ) : (
                    <div className="row g-3">
                      {jobListings.length > 0 ? (
                        jobListings.map((job) => (
                          <div className="col-12" key={job._id}>
                            <div className="row p-3 shadow-sm rounded bg-light d-flex flex-row justify-content-between align-items-center">
                              <div className="col-md-5">
                                <p className="text-muted me-3 mb-0">Position</p>
                                <h6 className="fw-semibold me-3 mb-0">{job.title}</h6>
                              </div>
                              <div className="col">
                                <p className="text-muted me-3 mb-0">Experience</p>
                                <h6 className="fw-semibold me-3 mb-0">{job.experience}</h6>
                              </div>
                              <div className="col">
                                <p className="text-muted me-3 mb-0">Deadline</p>
                                <h6 className="fw-semibold me-3 mb-0">{job.deadline}</h6>
                              </div>
                              <div className="col-md-1">
                                <p className="text-muted mb-0">
                                  <button
                                    onClick={() => handleJobClick(job)}
                                    className="border-0 bg-transparent"
                                  >
                                    <GoArrowRight size={25} />
                                  </button>
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center">Job Not Available.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ActivityPage />
      </div>
      <Footer />
    </>
  );
};

export default Career;
