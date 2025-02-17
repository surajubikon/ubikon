import React from "react";
import Navbar from '../components/Navbar';
import Banner from '../assets/img/service-img.webp';
import srv1 from '../assets/img/srvimg1.png';
import srv2 from '../assets/img/srvimg2.png';
import srv3 from '../assets/img/srvimg3.png';
import srv4 from '../assets/img/srvimg4.png';
import serviceimg1 from '../assets/img/service-img1.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";  // Import React Helmet


const ServicePage = () => {

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("https://ubikon.in/api/services/all");
       
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error.response?.data || error.message);
      }
    };

    fetchServices();
  }, []);
  const settings = {

    dots: false,              // Show navigation dots
    infinite: true,           // Infinite scrolling
    speed: 500,               // Transition speed in ms
    slidesToShow: 3,          // Number of slides to show
    slidesToScroll: 1,        // Number of slides to scroll
    autoplay: true,           // Enable autoplay
    autoplaySpeed: 2000,      // Delay between transitions
            // Show next/prev arrows
    centerMode: true,         // Center the active slide
      // Click to select the active slide
    // centerPadding: "60px",    // Padding on the sides to make the next slides visible
  };
  
  return (
    <>
      <Navbar />
      <div className="services-section">
        <div className="relative w-full">
          <div className="">
            <img
              src={Banner}
              alt="Banner"
              className="w-100 h-64 object-cover"
            />
            <div className="sr-title">
              <div className="">
                <h2 className="fw-bold">Our Services</h2>
                <p>We Provide Perfect IT Solutions for Your Business</p>
              </div>
              <Helmet>
                <title>Our Services - Software, App, Website Development</title>
                <meta name="description" content="Explore our expert services in Software Development, App Development, Website Development, and more. High-quality solutions for your business needs." />
                <meta name="keywords" content="software development, app development, website development, IT services, business solutions, mobile apps, web apps, ecommerce development, AI, blockchain, digital transformation" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            </div>
          </div>

          <div className="sec-card-conten top-10 left-1/2 transform -translate-x-1/2 flex gap-4">
            <div className="container">
              <div className="row">
                <div className="col-sm-3">
                  <div className="bg-white p-4 shadow-lg rounded-lg w-40 text-center">
                    <div className="imgsr"> <img src={srv1} className="w-full h-24 object-cover rounded-md" /> </div>
                    <h6 className="mt-2 text-lg fw-bold">Website Development</h6>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="bg-white p-4 shadow-lg rounded-lg w-40 text-center">
                    <div className="imgsr"> <img src={srv2} className="w-full h-24 object-cover rounded-md" /> </div>
                    <h6 className="mt-2 text-lg fw-bold">UI UX DESIGN</h6>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="bg-white p-4 shadow-lg rounded-lg w-40 text-center">
                    <div className="imgsr"> <img src={srv3} className="w-full h-24 object-cover rounded-md" /> </div>
                    <h6 className="mt-2 text-lg fw-bold">App Development</h6>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="bg-white p-4 shadow-lg rounded-lg w-40 text-center">
                    <div className="imgsr"> <img src={srv4} className="w-full h-24 object-cover rounded-md" /> </div>
                    <h6 className="mt-2 text-lg fw-bold">Digital Marketing</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="our-top-serv">
            <div className="our-title">
              <h2 className="fw-bold">Our Top Services</h2>
              <p>We ensure you have every functionality you need to build, run, and expand your marketplace</p>
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <Slider {...settings}>
                    {services.length > 0 ? (
                      services.map((service) => (
                        <div key={service._id}>
                          <div className="card text-center">
                            <div className="text-center">
                              <Link to={`/service/${service.slug}`}>
                                {service.thumbnail && (
                                  <img
                                    width="100%"
                                    src={service.thumbnail}
                                    alt={service.title || "Image"}
                                    className="card-img-top"
                                  />
                                )}
                              </Link>
                            </div>
                            <div className="card-body">
                              <h5 className="card-title">
                                <Link to={`/service-list/${service.slug}`}>
                                  {service.title || "No Title"}
                                </Link>
                              </h5>
                              <p className="card-text">
                                {service.description
                                  ? service.description.split(" ").length > 15
                                    ? service.description.split(" ").slice(0, 15).join(" ") + "..."
                                    : service.description
                                  : "No Description"}
                              </p>
                              {/* <Link to={`/service-list/${service.slug}`} className="btn btn-primary">
                                View More
                              </Link> */}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No services found</p>
                    )}
                  </Slider>
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

export default ServicePage;
