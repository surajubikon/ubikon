import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { FaPlayCircle } from "react-icons/fa";

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [show, setShow] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState("");

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/testimonials/all');
                setTestimonials(response.data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };
        fetchTestimonials();
    }, []);

    const toggleExpand = (index) => {
        setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    // Convert YouTube link to embeddable format
    const getEmbedUrl = (url) => {
        if (url.includes("youtu.be")) {
            return url.replace("youtu.be/", "www.youtube.com/embed/");
        } else if (url.includes("watch?v=")) {
            return url.replace("watch?v=", "embed/");
        }
        return url;
    };

    const handleShow = (videoUrl) => {
        const embedUrl = getEmbedUrl(videoUrl);
        setSelectedVideo(embedUrl);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <div className='mb-5 testimonial'>
            <div className='container'>
                <div className="blog-heading">
                    <span>Testimonial</span>
                    <h2>See Why Clients Love Working With Us</h2>
                </div>
                <div className="mx-auto mt-10">
                    <Slider {...settings}>
                        {testimonials.length > 0 ? (
                            testimonials.map((item, index) => {
                                const words = item.paragraph.split(" ");
                                const shortText = words.slice(0, 18).join(" ") + "...";

                                return (
                                    <div key={index}>
                                        <div className="slide-item text-center position-relative">
                                            {/* Wrapper div for image and play icon */}
                                            <div style={{ position: "relative", display: "inline-block" }}>
                                                {/* Image */}
                                                <img
                                                    className='d-inline-block img-fluid mt-2'
                                                    src={item.image}
                                                    alt={item.name}
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        objectFit: "cover",
                                                        cursor: "pointer",
                                                        borderRadius: "5px" // Optional: Rounded corners
                                                    }}
                                                    onClick={() => handleShow(item?.video)}
                                                />

                                                {/* Transparent Play Icon on Image */}
                                                <FaPlayCircle
                                                    size={30} // Adjust size as needed
                                                    color="rgba(255, 255, 255, 0.8)" // Semi-transparent white
                                                    style={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: "50%",
                                                        transform: "translate(-50%, -50%)",
                                                        cursor: "pointer",
                                                        pointerEvents: "none" // Prevents icon from blocking image clicks
                                                    }}
                                                />
                                            </div>

                                            <h5 className='mt-2'>{item.name}</h5>
                                            <p className='small'>{item.heading}</p>
                                            <p>
                                                {expanded[index] ? item.paragraph : shortText}
                                                {words.length > 20 && (
                                                    <button
                                                        onClick={() => toggleExpand(index)}
                                                        className="btn btn-sm ms-2"
                                                        style={{
                                                            background: "linear-gradient(45deg, #ff9800, #ff5722)",
                                                            border: "none",
                                                            color: "white",
                                                            padding: "5px 10px",
                                                            borderRadius: "5px",
                                                            fontWeight: "bold"
                                                        }}
                                                    >
                                                        {expanded[index] ? "See Less" : "See More"}
                                                    </button>
                                                )}
                                            </p>
                                        </div>

                                    </div>
                                );
                            })
                        ) : (
                            <p>Loading testimonials...</p>
                        )}
                    </Slider>
                </div>
            </div>

            {/* Video Modal */}
            <Modal show={show} onHide={handleClose} fullscreen>

                <Modal.Header closeButton>
                    <Modal.Title>Testimonial Video</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {selectedVideo && (
                        <iframe
                            width="100%"
                            height="250"
                            src={selectedVideo}
                            title="YouTube video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Testimonials;
