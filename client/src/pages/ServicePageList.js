import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../components/Navbar';
import mobileimBg from '../assets/img/mobile-dev.jpg';
import { useParams, useNavigate } from "react-router-dom";
import { baseURL } from "../API/api.url";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import Footer from '../components/Footer';

// Normalize function
const normalizeText = (text) =>
  text.toLowerCase().trim().replace(/[^a-z0-9\s]/g, "");

const ServicesPageList = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/services/slug/${slug}`)
      .then((response) => {
        setService(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  if (error) return <h2 className="text-danger text-center my-5">{error}</h2>;
  if (!service) return <h2 className="text-center my-5">No data found!</h2>;
  // Function to find the best match
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
        <div className="" style={{marginTop:"88px"}}>
          <img src={mobileimBg} width="100%" />
        </div>
        {/* Content */}
        <div className="container d-flex flex-column">
          <div className="row text-center mb-4">
            <div className="mt-5 mb-4">
              <h2 className="fw-bold text-uppercase text-theme"> {service.title} </h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
          </div>

          <div className="row mb-5">

            <div className="col-md-6">
              <div>
                <img
                  src={`${baseURL}${service.thumbnail}`}
                  alt={service.title}
                  className="img-fluid rounded"
                  style={{ maxWidth: "100%", height: "auto", maxHeight: "400px" }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <div className="card-body">
                  <h4 className="fw-bold fs-3 mb-3 text-theme">{service.title}</h4>
                  <p className="text-muted">{service.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="technologies-bhd">
            <div  className=" my-5 row text-center">
                <h2 className="fw-bold">Technologies Behind {service.title}</h2>
                <p className="text-muted">
                  Modern {service.title} requires the best tools and technologies.
                </p>
            </div>
            <div className="row ">
              {service.dynamicFields?.map((field) => (
                <div className="col-md-6 mb-4" md={6} key={field._id}>
                  <div  className="card shadow-sm border-0">
                    <div className="card-body">
                      <h2 className="fw-bold">{field.heading}</h2>
                      <p>{field.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>  

          <Row className="text-center my-5">
            <Col>
              <h2 className="fw-bold">Want to Know More?</h2>
              <p className="text-muted">Let's discuss how we can help your business.</p>
              <Button
                className="px-4 py-2 fw-bold border-0"
                style={{
                  background: "linear-gradient(90deg, #ff7e00, #ffbb00)",
                  color: "white",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => (e.target.style.opacity = "0.8")}
                onMouseOut={(e) => (e.target.style.opacity = "1")}
                onClick={() => navigate("/contact")}
              >
                Get in Touch
              </Button>
            </Col>
          </Row>
        </div>

        {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
};

export default ServicesPageList;
