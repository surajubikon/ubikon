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
                const response = await axios.get("https://ubikon.in/api/services/all");
                console.log("API Response:", response.data);
                setServices(response.data);
            } catch (error) {
                console.error("Error fetching services:", error.response?.data || error.message);
            }
        };

        fetchServices();
    }, []);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,  // Autoplay ke liye infinite loop enable
        speed: 500,
        slidesToShow: services.length >= 3 ? 3 : services.length, // 3 slides ek saath dikhao, agar 3 se kam hai to wo count
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
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
                                    <Link to={`/service/${service.slug}`}>
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
