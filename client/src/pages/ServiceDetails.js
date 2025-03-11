import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { baseURL } from "../API/api.url";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ServiceDetails = () => {
  const { slug } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseURL}/api/sub-services/${slug}`)
      .then((response) => {
        setServiceDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching service details:", error);
        setError("Error fetching service details");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="warning" />
      </Container>
    );
  }

  if (error) {
    return <h2 className="text-center text-danger">{error}</h2>;
  }

  if (!serviceDetails) {
    return <h2 className="text-center">Service Not Found</h2>;
  }

  return (
    <>
      {/* Navbar Fix - Ensuring title is visible */}
      <Navbar />
      <Container
        className="d-flex flex-column"
        style={{
          paddingTop: "120px",
          minHeight: "80vh",
        }}
      >
        <Row className="text-center mb-4">
          <Col>
            <h1
              className="fw-bold text-uppercase"
              style={{
                background: "linear-gradient(45deg, #FFA500, #FF8C00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              {serviceDetails.title}
            </h1>
          </Col>
        </Row>

        <Row className="align-items-center mb-5">
          <Col md={6} className="text-center text-md-start">
            <Card className="p-4 shadow-sm border-0" style={{ borderRadius: "10px" }}>
              <Card.Body>
                <Card.Title className="fw-bold fs-3">{serviceDetails.title}</Card.Title>
                <Card.Text className="text-muted fs-5">{serviceDetails.description}</Card.Text>
                <Button
                  style={{
                    background: "linear-gradient(45deg, #FFA500, #FF8C00)",
                    border: "none",
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "8px",
                  }}
                  onClick={() => navigate("/")}
                >
                  Get in Touch
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="text-center">
            {serviceDetails.thumbnail && (
              <img
                src={`${baseURL}${serviceDetails.thumbnail}`}
                alt={serviceDetails.title}
                className="img-fluid rounded shadow"
                style={{ maxHeight: "400px", border: "1px solid #ddd", padding: "8px" }}
              />
            )}
          </Col>
        </Row>

        <Row className="my-5 text-center">
          <Col>
            <h2 className="fw-bold">Key Features of {serviceDetails.title}</h2>
          </Col>
        </Row>

        <Row>
          {serviceDetails.dynamicFields?.map((field) => (
            <Col md={6} key={field._id} className="mb-4">
              <Card className="shadow border-0">
                <Card.Body>
                  <Card.Title className="fw-bold">{field.heading}</Card.Title>
                  <Card.Text>{field.value}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="text-center my-5">
          <Col>
            <h2 className="fw-bold">Want to Know More?</h2>
            <p className="text-muted">Contact us today and let's discuss your requirements!</p>
            <Button
              style={{
                background: "linear-gradient(45deg, #FFA500, #FF8C00)",
                border: "none",
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
              }}
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Footer Fix - Making sure it stays at the bottom */}
      <Footer />
    </>
  );
};

export default ServiceDetails;
