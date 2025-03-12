import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from "react-router-dom";
import { baseURL } from "../API/api.url";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from '../components/Footer';
import ReactIcon from "./ReactIcon"

const iconMap = {
  "web development": <ReactIcon />,
  // "flutter development": <FlutterIcon />,
  // "ai ml development": <AIIcon />,
};

// Function to find the best match
const getClosestMatch = (input) => {
  const normalizedInput = normalizeText(input);

  // Find best match from iconMap keys
  return (
    Object.keys(iconMap).find((key) =>
      normalizedInput.includes(key.split(" ")[0]) // Match first word
    ) || null
  );
};

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

      {/* Content */}
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
              {service.title}
            </h1>
          </Col>
        </Row>

        <Row className="align-items-center mb-5">
          <Col md={6}>
            <Card
              className="shadow-sm border-0 p-4"
              style={{
                borderRadius: "10px",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.15)",
                border: "1px solid #ddd",
              }}
            >
              <Card.Body>
                <Card.Title className="fw-bold fs-3">{service.title}</Card.Title>
                <Card.Text className="text-muted fs-5">{service.description}</Card.Text>
                <Button
                  className="px-4 py-2 fw-bold border-0"
                  style={{
                    background: "linear-gradient(90deg, #ff7e00, #ffbb00)",
                    color: "white",
                    transition: "0.3s",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.15)",
                    border: "1px solid #ff7e00",
                  }}
                  onMouseOver={(e) => (e.target.style.opacity = "0.8")}
                  onMouseOut={(e) => (e.target.style.opacity = "1")}
                  onClick={() => navigate("/contact")}
                >
                  Contact Us
                </Button>

              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.15)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={`${baseURL}${service.thumbnail}`}
                alt={service.title}
                className="img-fluid rounded"
                style={{ maxWidth: "100%", height: "auto", maxHeight: "400px" }}
              />
            </div>
          </Col>
        </Row>

        <Row className="text-center my-5">
          <Col>
            <h2 className="fw-bold">Technologies Behind {service.title}</h2>
            <p className="text-muted">
              Modern {service.title} requires the best tools and technologies.
            </p>

            {/* Get Closest Match & Show Icon */}
            {iconMap[getClosestMatch(service.title)]}
          </Col>
        </Row>
        
        <Row>
          {service.dynamicFields?.map((field) => (
            <Col md={6} key={field._id} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="fw-bold text-primary">{field.heading}</Card.Title>
                  <Card.Text>{field.value}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

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
      </Container>

      {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
};

export default ServicesPageList;
