import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import careerBg from "../assets/img/career-bg.jpg"; // Local image import

import benefit1 from "../assets/img/benefit1.png";
import benefit2 from "../assets/img/benefit2.png";
import benefit3 from "../assets/img/benefit3.png";
import benefit4 from "../assets/img/benefit4.png";
import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
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

const tabData = [
  {
    title: "Culture",
    images: [culture1, culture2, culture3, culture4],
  },
  {
    title: "Work",
    images: [work1, work2, work3, work4],
  },
  {
    title: "Events",
    images: [events1, events2, events3, events4],
  },
  {
    title: "Team",
    images: [team1, team2, team3, team4],
  },
];

const Career = () => {
  const [selectedTab, setSelectedTab] = useState(0);

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
            {/* Heading */}
            <div className="col-md-6 mx-auto mb-5">
              <p className="text-center fw-semibold mb-3">Come join us</p>
              <h2 className="fw-bold text-center">Career Openings</h2>
              <p className="text-muted text-center">We’re always looking for creative, talented self-starters to join the JMC
                family. Check out our open roles below and fill out an application.</p>
            </div>

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
                      { title: "Wordpress Developer", Experience: "Experience", Year: "2 Years", Deadline: "Deadline", Date: "2021-05-08" },
                      { title: "Product Designer", Experience: "Experience", Year: "3 Years", Deadline: "Deadline", Date: "2021-05-08" },
                      { title: "Marketing Manager", Experience: "Experience", Year: "5 Years", Deadline: "Deadline", Date: "2021-05-08" },
                      { title: "Customer Support Specialist", Experience: "Experience", Year: "2 Years", Deadline: "Deadline", Date: "2021-05-08" }
                    ].map((job, index) => (
                      <div className="col-12" key={index}>
                        <div className="row p-3 shadow-sm rounded bg-light d-flex flex-row justify-content-between align-items-center">
                          <div className="col-md-5">
                            <h6 className="fw-semibold me-3 mb-0">{job.title}</h6>
                          </div>
                          <div className="col">
                            <p className="text-muted me-3 mb-0">{job.Experience}</p>
                            <h6 className="fw-semibold me-3 mb-0">{job.Year}</h6>
                          </div>
                          <div className="col">
                            <p className="text-muted me-3 mb-0">{job.Deadline}</p>
                            <h6 className="fw-semibold me-3 mb-0">{job.Date}</h6>
                          </div>
                          <div className="col-md-1">
                            <p className="text-muted mb-0"><GoArrowRight size={25} />
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className=" py-5 bg-light">
            <div className="container">
              <h2 className=" fw-bold mb-4 text-center">Life at Ubikon</h2>

              <Tabs selectedIndex={selectedTab} onSelect={(index) => setSelectedTab(index)}>
                <TabList className="nav nav-tabs d-flex justify-content-center mb-5">
                  {tabData.map((tab, index) => (
                    <Tab
                      key={index}
                      className={`nav-item nav-link px-3 py-2 border-0 cursor-pointer  ${selectedTab === index ? 'active border-primary text-primary border-0 border-bottom bg-transparent' : 'text-dark'}`}
                    >
                      {tab.title}
                    </Tab>
                  ))}
                </TabList>

                {tabData.map((tab, index) => (
                  <TabPanel key={index}>
                    <motion.div
                      key={selectedTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="row g-3 px-3"
                    >
                      {tab.images.map((image, imgIndex) => (
                        <motion.div key={imgIndex} className="col-6 col-md-3">
                          <img
                            src={image}
                            alt="Life at Ubikon"
                            className="img-fluid rounded shadow-sm"
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabPanel>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    <Footer />  
  </>  
  );
};

export default Career;
