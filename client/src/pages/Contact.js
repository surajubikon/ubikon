import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api, { baseURL } from '../API/api.url';
import appointment from '../assets/img/appointment.png';
import AD from '../assets/img/address.png';
import PH from '../assets/img/phone.png';
import clLogo from '../assets/img/cl1.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet'; // Ensure you import Helmet for SEO
import Footer from '../components/Footer';
const Contact = () => {
  const [formData, setFormData] = useState({
    yourName: '',
    email: '',
    contactNumber: '',
    subject: '',
    textMessage: '',

    // agree: false,
  });
  const [loading, setLoading] = useState(false);
  const subjects = ["Mobile App Development", "Web Development", "UI/UX Design", "Digital Marketing", "Search Engine Optimization (SEO)"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}${api.contact.createContact.url}`, formData);
      toast.success(response?.data?.message || 'Message sent successfully!', {
        autoClose: 3000,
        style: { background: '#d0f0ff', color: '#000' },
      });
      setFormData({
        yourName: '',
        email: '',
        contactNumber: '',
        subject: '',
        textMessage: '',
        // agree: false,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit contact form', {
        autoClose: 3000,
        style: { background: '#ffcccc', color: '#000' },
      });
    }
    setLoading(false);
  };

  return (
    <div className="col-sm-12">
      <Navbar />
      <div className="contact">
        {/* SEO Meta Tags */}
        <Helmet>
          <title>Contact | Ubikon - Mobile App & Website Development in Indore</title>
          <meta name="description" content="Contact Ubikon Technologies for expert mobile app and website development services in Indore, Madhya Pradesh. Get a free consultation!" />
        </Helmet>

        <div className="contact-details-section bg-bectangle-bottom" atl="Contact Ubikon for expert mobile app and website development services in Indore, Madhya Pradesh">
          <div className="container pb-3">
            <div className="text-center cnt-heading"><h3>Contact Us</h3></div>
            <div className="row">
              <div className="col-sm-4 text-center">
                <img className="mb-2" src={appointment} alt="Open Hours" />
                <h5 className="mb-3">Open Hours</h5>
                <p className="mb-1">Mon-Fri: 9 AM - 6 PM</p>
                <p className="mb-1">Saturday: 9 AM - 4 PM</p>
                <p className="mb-0 text-warning">Sunday : Closed</p>
              </div>
              <div className="col-sm-4 text-center">
                <img className="mb-2" src={AD} alt="Address" />
                <h5 className="mb-3">Our Address</h5>
                <p className="mb-1">C21 Mall, Scheme 54 PU4</p>
                <p className="mb-1">Vijay Nagar, Indore</p>
                <p className="mb-0"><a href="#" className="text-warning">See Location</a></p>
              </div>
              <div className="col-sm-4 text-center">
                <img className="mb-2" src={PH} alt="Phone" />
                <h5 className="mb-3">Get in Touch</h5>
                <p className="mb-1">
                  Mobile: <a href="tel:+916264818989">+91 6264818989</a>
                </p>
                <p className="mb-1">Email : <a href="mailto:contact@ubikon.in" className="text-warning">contact@ubikon.in</a></p>
                <p className="mb-0"><a href="#contact-form" className="text-warning">Contact form</a></p>
              </div>
            </div>
          </div>
        </div>
        <div className='map-location'>
          <h4>Find Us Here</h4>
          <p>We are located at Scheme 54 PU4, Vijay Nagar, Indore. Visit us to discuss your project needs!</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.5528110773676!2d75.89480087385589!3d22.74485702663767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39631d6085d28575%3A0x5264cb5c10c6373a!2sUbikon%20Technologies%20Pvt%20Ltd%20%7C%20Website%20Design%20%26%20Mobile%20App%20Development!5e0!3m2!1sen!2sin!4v1738912852566!5m2!1sen!2sin"
            width="100%" // Set to 100% for responsiveness
            height="450"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubikon Technologies Location" // Added title for accessibility
          ></iframe>
        </div>
        <div className="container">
          <div className="contact-section">
          <div className='row'>
           <div className='col-md-6 col-12'>
            <div className="contact-details">
              <h2>Have Questions? <br /> Get in Touch!</h2>
              <p>We are here to assist you with all your mobile app and website development needs. Let's start a conversation!</p>
              <ul>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <a href="https://www.google.com/maps/place/C21+Mall,+Scheme+54+PU4+Vijay+Nagar,+Indore"
                    target="_blank"
                    rel="noopener noreferrer">
                    C21 Mall, Scheme 54 PU4 Vijay Nagar, Indore
                  </a>
                </li>
                <li>
                  <i className="fas fa-mobile-alt"></i>
                  <a href="tel:+916264818989">+91 6264818989</a>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:contact@ubikon.in">contact@ubikon.in</a>
                </li>

              </ul>
            </div>
           </div> 

            {/* Contact Form */}
           <div className='col-md-6 col-12'>
            <div className="contact-form" id="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-sm-6">
                    <span className="icon"><i className="fa-regular fa-user"></i></span>
                    <input type="text" name="yourName" placeholder="Name" value={formData.yourName} onChange={handleChange} required />
                  </div>
                  <div className="form-group col-sm-6">
                    <span className="icon"><i className="fa-regular fa-envelope"></i></span>
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-6">
                    <span className="icon"><i className="fa-solid fa-phone"></i></span>
                    <input type="text" name="contactNumber" placeholder="Phone" value={formData.contactNumber} onChange={handleChange} />
                  </div>
                  <div className='form-group col-sm-6'>

                    <span className="icon"><i className="fa-solid fa-info"></i></span>
                    <select name="subject" value={formData.subject} onChange={handleChange} required>
                      <option value="">Select Services</option>
                      {subjects.map((subj, index) => (
                        <option key={index} value={subj}>{subj}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='form-group'>
                  <span className='icon'><i className="fas fa-pencil-alt"></i></span>
                  <textarea name="textMessage" placeholder="How can we help you? Feel free to get in touch!" value={formData.textMessage} onChange={handleChange} required></textarea>
                </div>

                <button type="submit" className='default-btn mt-5' disabled={loading}>
                  {loading ? "Submitting..." : "Get In Touch"}
                </button>
              </form>
            </div>
          </div> 
          </div>  

          </div>
        </div>
        {/* Partners */}
        {/* <div className="partners">
          <h4>Our Partners</h4>
          <div className='partnerlg'><img src={clLogo} alt="Partner 1" /></div>
          <div className='partnerlg'><img src={clLogo} alt="Partner 2" /></div>
          <div className='partnerlg'><img src={clLogo} alt="Partner 3" /></div>
          <div className='partnerlg'><img src={clLogo} alt="Partner 4" /></div>
          <div className='partnerlg'><img src={clLogo} alt="Partner 5" /></div>
        </div> */}
        {/* Footer */}
        <Footer />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Contact;