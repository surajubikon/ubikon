import { BiAdjust } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import careerbg from "../assets/img/career-bg.jpg";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseURL } from "../API/api.url";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ServiceDetails = () => {
  const { slug } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <Navbar />
      <div className="service-dts">
        <div className="service-dts-banner">
          <div className="position-relative text-start text-white">
            {serviceDetails.thumbnail && (
              <img
                src={`${baseURL}${serviceDetails.thumbnail[0]}`}
                alt={serviceDetails.title}
                className="w-100"
            />
            )}
            <div className="position-absolute top-50 start-50 translate-middle p-4 rounded">
              {/* <h1 className="mb-2">{serviceDetails.title}</h1> */}
              {/* <p className="mb-3">{serviceDetails.description}</p> */}
              {/* <button className="btn btn-danger">Click Here</button> */}
            </div>
          </div>
        </div>
        <div className="featurs py-5">
          <div className="container">
            <h2 className="mb-4 fw-bold text-center text-theme">Key Features</h2>
            <div className="row">
              {serviceDetails.features?.map((feature) => (
                <div className="col-sm-4" key={feature._id}>
                  <div className="card">
                    <div className="card-body">
                      <FaCheckCircle className="mb-2" size={30} />
                      <h5 className="fw-bold">{feature.title}</h5>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{backgroundColor: "#333", fontFamily: "Arial", color: "white"}} className="py-5">
          <div className="container"> 
          <div dangerouslySetInnerHTML={{ __html: serviceDetails.content }} />
          </div>

        </div>
        <div className="use-cases py-5">
          <div className="container">
            <h2 className="mb-4 fw-bold text-center text-theme">Use Cases</h2>
            <div className="row">
              {serviceDetails.useCases?.map((useCase) => (
                <div className="col-sm-3" key={useCase._id}>
                  <div className="card">
                    <div className="card-body">
                      <BiAdjust className="mb-2" size={30} />
                      <h5 className="fw-bold">{useCase.title}</h5>
                      <p className="small">{useCase.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="featurs py-5">
          <div className="container">
            <h2 className="mb-4 fw-bold text-theme">Why Choose Us?</h2>
            <div className="row">
              <div className="col-sm-6">
                <div className="text-white">
                  {serviceDetails.whyChooseUs?.map((reason) => (
                    <div className="mb-3" key={reason._id}>
                      <h5>{reason.title}</h5>
                      <p className="muted-text">{reason.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="row">
                  {serviceDetails.whyChooseUs?.map((_, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <BiAdjust className="mb-2" size={30} />
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
      <Footer/>
    </>
  );
};

export default ServiceDetails;