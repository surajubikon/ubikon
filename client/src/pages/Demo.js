import React from "react";
import InvBG from '../assets/img/invoiceBG.jpg'
import { FaCheckCircle } from "react-icons/fa";
import { Color } from "antd/es/color-picker";

const InvoicePage = () => {
  return (
  <>
   
    <div className="invoice-section position-relative">
      
      {/* Banner with Image */}
      <div className="position-relative w-100 overflow-hidden">
        <img src={InvBG} alt="Banner" className="img-fluid w-100" />
      </div>

      <div className="container py-4 position-relative">

        {/* Main Card Container */}
        <div className="card border-0 shadow-lg mt-4 mx-auto bg-white">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <p><FaCheckCircle color="#0084C3" size={20} className="me-2" />Bill To:</p>
                <div className="card p-3">
                  <h3 className="fw-bold h5 mb-2">Mauro Sicard </h3>
                  <p className="mb-1">(612) 856 - 0989</p>
                  <p className="mb-1">contact@maurosicard.com</p>
                  <p className="mb-1">Pablo Alto, San Francisco, CA 92102, United States of America</p>
                </div>
              </div>
              <div className="col-md-5">
                <p><FaCheckCircle color="#0084C3" size={20} className="me-2" />Bill From:</p>
                <div className="card p-3">
                  <h3 className="fw-bold h5 mb-2">Ubikon Technologies Pvt.Ltd</h3>
                  <p className="mb-1">+91 6264818989</p>
                  <p className="mb-1">Behind C21,Vijay Nagar Square, Scheme 54 PU4, Indore, Madhya Pradesh 452010</p>
                  <p className="mb-1">12345 6789 US0001</p>
                </div>
              </div>
              <div className="col-md-3">
                <p><FaCheckCircle color="#0084C3" size={20} className="me-2" />Contact US</p>
                <div className="card p-3">
                  <h3 className="fw-bold h5 mb-2">Contact us</h3>
                  <p className="mb-1">+91 6264818989</p>
                  <p className="mb-1">contact@ubikon.in</p>
                  <p className="mb-1">www.ubikon.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Invoice Table Section */}
        <h2 className="fw-semibold mt-5 h4 mb-4">Project Overview</h2>
        <div className="card shadow-lg rounded mx-auto bg-white">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table border-0">
              <thead className="border-0" >
                  <tr>
                    <th style={{ color: '#868DA6' }}>Description</th>
                    <th style={{ color: '#868DA6' }}>Qty</th>
                    <th style={{ color: '#868DA6' }}>Price</th>
                    <th style={{ color: '#868DA6' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-top border-bottom">
                    <td>Web design</td>
                    <td>1</td>
                    <td>₹5,250.00</td>
                    <td>₹5,250.00</td>
                  </tr>
                  <tr className="border-top border-bottom mt-3">
                    <td colSpan="4" className="pt-3 pb-3">
                      Our web design approach focuses on creating visually stunning, user-friendly, and responsive websites tailored to your brand. We blend creativity with functionality, ensuring seamless navigation and an engaging user experience.<br/>
                      <strong>Technologies We Use:</strong><br/>
                      Frontend: HTML, CSS, JavaScript, ReactJS, Next.js<br/>
                      Backend: Node.js, Express.js, Django, Laravel<br/>
                      Database: MySQL, MongoDB, PostgreSQL<br/>
                      Design Tools: Figma, Adobe XD, Sketch<br/>
                      CMS Platforms: WordPress, Shopify, Webflow
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="text-end fw-bold">Total Amount:</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="text-end fw-bold">₹19,570.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="card border-0 shadow-lg mt-4 mx-auto bg-white">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <p>
                  <span className=" rounded-pill mx-2 mx-2" style={{ fontSize: "12px", padding: "6px 11px", backgroundColor:"#0084C3", color:"#fff" }}>
                    1
                  </span>
                  First Payment</p>
                <div className="card p-3 rounded-4">
                  <h3 className="fw-bold h5 mb-2">Advanced Payment </h3>
                  <p>30% </p>
                </div>
              </div>
              <div className="col-md-5">
                <p>
                  <span className=" rounded-pill mx-2" style={{ fontSize: "12px", padding: "6px 11px", backgroundColor:"#0084C3", color:"#fff" }}>
                    2
                  </span>Second Payment</p>
                <div className="card p-3 rounded-4">
                  <h3 className="fw-bold h5 mb-2">Design & Prototypes </h3>
                  <p className="mb-1">25%</p>
                </div>
              </div>
              <div className="col-md-3">
                <p>
                  <span className=" rounded-pill mx-2" style={{ fontSize: "12px", padding: "6px 11px", backgroundColor:"#0084C3", color:"#fff" }}>
                    3
                  </span>Third Payment</p>
                <div className="card p-3 rounded-4">
                  <h3 className="fw-bold h5 mb-2">Development</h3>
                  <p className="mb-1">25%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Terms & Conditions Section */}
        <div className="card-body mt-5 position-relative">
            <h6 className="fw-semibold mt-1">Terms & Conditions</h6>
            <p>
              Fees and payment terms will be established in the contract or agreement prior to the commencement of the project. An initial deposit will be required before any design work begins. We reserve the right to suspend or halt work in the event of non-payment. For more details, please visit <a href="www.ubikon.in/policy" style={{ color: "#ffffff" }}>www.ubikon.in/policy</a>.
            </p>
          </div>
      </div>
   </div> 
  </>  
  );
};

export default InvoicePage;
