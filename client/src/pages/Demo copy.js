import React from "react";
import { BiAdjust } from "react-icons/bi";
import careerbg from '../assets/img/career-bg.jpg'

import { IconName } from "react-icons/bi";

import { FaCheckCircle } from "react-icons/fa";
import { Color } from "antd/es/color-picker";

const InvoicePage = () => {
  return (
  <>
   
    <div className="service-dts">
        <div className="service-dts-banner">
          <div className="">
            <div className="position-relative text-start text-white">
              <img
                src={careerbg}
                alt="Banner"
                className="img-fluid"
              />
              <div className="position-absolute top-50 start-50 translate-middle p-4 rounded">
                <h1 className="mb-2">Banner Heading</h1>
                <p className="mb-3">This is a paragraph describing the banner. It provides some details about the banner content.</p>
                <button className="btn btn-danger">Click Here</button>
              </div>
            </div>
          </div>
        </div>
        <div className="featurs py-5">
          <div className="container">
              <h2 className="mb-4 fw-bold text-center text-theme">key Features</h2>
              <div className="row">
                  <div className="col-sm-4">
                      <div className="card">
                          <div className="card-body">
                              <BiAdjust className="mb-2" size={30} />
                              <h5 className="fw-bold">Fast Performance</h5>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm-4">
                      <div className="card">
                          <div className="card-body">
                              <BiAdjust className="mb-2" size={30} />
                              <h5 className="fw-bold">Clean Code</h5>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm-4">
                      <div className="card">
                          <div className="card-body">
                              <BiAdjust className="mb-2" size={30} />
                              <h5 className="fw-bold">Responsive Design</h5>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm-4">
                      <div className="card">
                          <div className="card-body">
                              <BiAdjust className="mb-2" size={30} />
                              <h5 className="fw-bold">Security First</h5>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm-4">
                      <div className="card">
                          <div className="card-body">
                              <BiAdjust className="mb-2" size={30} />
                              <h5 className="fw-bold">SEO Optimized</h5>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm-4">
                      <div className="card">
                          <div className="card-body">
                              <BiAdjust className="mb-2" size={30} />
                              <h5 className="fw-bold">Quick Delivery</h5>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <div className="use-cases py-5">
          <div className="container">
              <h2 className="mb-4 fw-bold text-center text-theme">Use Cases</h2>
              <div className="row">
                  <div className="col-sm-3">
                      <div className="card">
                          <div className="card-body">
                              <BiAdjust className="mb-2" size={30} />
                              <h5 className="fw-bold">e-commerce</h5>
                              <p className="small">Lorem Ipsum is simply</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm-3">
                      <div className="card">
                          <div className="card-body">
                              <BiAdjust className="mb-2" size={30} />
                              <h5 className="fw-bold">Analytics Dashboard</h5>
                              <p className="small">Lorem Ipsum is simply</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm-3">
                      <div className="card">
                          <div className="card-body">
                              <BiAdjust className="mb-2" size={30} />
                              <h5 className="fw-bold">Social Platform</h5>
                              <p className="small">Lorem Ipsum is simply</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm-3">
                      <div className="card">
                          <div className="card-body">
                              <BiAdjust className="mb-2" size={30} />
                              <h5 className="fw-bold">Web Application</h5>
                              <p className="small">Lorem Ipsum is simply</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <div className="featurs py-5">
          <div className="container">
              <h2 className="mb-4 fw-bold text-theme">Why Choose Us?</h2>

              <div className="row">
                  <div className="col-sm-6">
                      <div className="text-white">
                          <div className="mb-3">
                              <h5>Diverse Expertise</h5>
                              <p className="muted-text">Our team consists of seasoned professionals with extensive experience across various technologies, ensuring that we can handle any development challenge.</p>
                          </div>
                          <div className="mb-3">
                              <h5>Customized Solutions</h5>
                              <p className="muted-text">We prioritize your unique needs by providing tailored solutions that align with your business objectives, helping you achieve your goals effectively.</p>
                          </div>
                          <div className="mb-3">
                              <h5>User-Focused Design</h5>
                              <p className="muted-text">We emphasize creating user-centered applications that enhance customer satisfaction and engagement, leading to increased retention and loyalty.</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-sm-6">
                      <div className="row">
                          <div className="col-md-4">
                              <div className="card">
                                  <div className="card-body">
                                    <BiAdjust className="mb-2" size={30} />
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-4">
                              <div className="card">
                                  <div className="card-body">
                                    <BiAdjust className="mb-2" size={30} />
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-4">
                              <div className="card">
                                  <div className="card-body">
                                    <BiAdjust className="mb-2" size={30} />
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-4">
                              <div className="card">
                                  <div className="card-body">
                                    <BiAdjust className="mb-2" size={30} />
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-4">
                              <div className="card">
                                  <div className="card-body">
                                    <BiAdjust className="mb-2" size={30} />
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-4">
                              <div className="card">
                                  <div className="card-body">
                                    <BiAdjust className="mb-2" size={30} />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
  </>  
  );
};

export default InvoicePage;
