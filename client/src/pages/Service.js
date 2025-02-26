import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";  // Import React Helmet

const Service = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/services/all");
               
                setServices(response.data);
            } catch (error) {
                console.error("Error fetching services:", error.response?.data || error.message);
            }
        };

        fetchServices();
    }, []);

    const settings = {
        dots: false,              // Hide navigation dots
        infinite: true,           // Enable infinite scrolling
        speed: 500,               // Transition speed in ms
        slidesToShow: 3,          // Default slides to show (Desktop)
        slidesToScroll: 1,        // Number of slides to scroll
        autoplay: true,           // Enable autoplay
        autoplaySpeed: 3000,      // Delay between transitions
        arrows: false,            // Hide next/prev arrows
        responsive: [
          {
            breakpoint: 1024,  // Large screens (below 1024px)
            settings: {
              slidesToShow: 2, // Show 2 slides at a time
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768, // Tablets (below 768px)
            settings: {
              slidesToShow: 1, // Show 1 slide at a time
              slidesToScroll: 1,
              dots: true, // Enable dots for better navigation
            },
          },
          {
            breakpoint: 480, // Mobile devices (below 480px)
            settings: {
              slidesToShow: 1, // Show 1 slide at a time
              slidesToScroll: 1,
              dots: true, // Enable dots for better UX
            },
          },
        ],
      };

    return (
        <div className="col-md-10">
            <Helmet>
                <title>Our Services - Software, App, Website Development</title>
                <meta name="description" content="Explore our expert services in Software Development, App Development, Website Development, and more. High-quality solutions for your business needs." />
                <meta name="keywords" content="software development, app development, website development, IT services, business solutions, mobile apps, web apps, ecommerce development, AI, blockchain, digital transformation" />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <Slider {...settings}>
                {services.length > 0 ? (
                    services.map((service) => (
                        <div key={service._id}>
                            <div className="services-item">
                                <div className="services-image">
                                    <Link to={`/service-list/${service.slug}`}>
                                        {service.thumbnail && (
                                            <img width="100%" src={service.thumbnail} alt={service.title || "Image"} />
                                        )}
                                    </Link>
                                </div>
                                <div className="services-content">
                                    <h3>
                                        <Link to={`/service-list/${service.slug}`}>
                                            {service.title || "No Title"}
                                        </Link>
                                    </h3>
                                    <p>
                                        {service.description
                                            ? service.description.split(" ").length > 15
                                                ? service.description.split(" ").slice(0, 15).join(" ") + "..."
                                                : service.description
                                            : "No Description"}
                                    </p>
                                    <Link to={`/service-list/${service.slug}`} className="services-btn">
                                        View More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No services found</p>
                )}
            </Slider>
        </div>
    );
};

export default Service;
