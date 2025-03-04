import React, { useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import Logo from '../assets/img/logo.png';
import api, { baseURL } from '../API/api.url';
import Chatbot from '../pages/Chatbot';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import WhatsApp from '../pages/WhatsApp';


import AnimatedCursor from "react-animated-cursor";

const Footer  = () => {

  // api calling from backend by axios
  const [sidebarmenu, setActive] = useState(false);
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
    <>
    
    <AnimatedCursor
            innerSize={8}
            outerSize={8}
            color="245, 133, 57"
            outerAlpha={0.2}
            innerScale={0.7}
            outerScale={5}
            zIndex={9999}
            clickables={[
              
              'a',
              'input[type="text"]',
              'input[type="email"]',
              'input[type="number"]',
              'input[type="submit"]',
              'input[type="image"]',
              'label[for]',
              'select',
              'textarea',
              'button',
              '.link'
            ]}
          />
      <footer className="bg-black text-white">
        <div className="container">
          <div className="footer-shape-1">
            <img src="https://templates.envytheme.com/coze/default/assets/images/footer/footer-shape-1.png" alt="image" />
          </div>
          {/* <div className="footer-shape-3">
            <img src="https://templates.envytheme.com/coze/default/assets/images/footer/footer-shape-3.png" alt="image" />
          </div> */}
          <div className="row">
            {/* About Section */}
            <div className="col-md-3 mb-4 mb-md-0">

              <a className="nav-link px-0 my-3" aria-current="page" href="#"><img width={139} src={Logo} /></a>
              <p>Empowering Your Business with Expert Mobile App & Website Development</p>
              <div className='d-flex mt-3'>
                <ul className="nav widget-social">
                  <li className="nav-item">
                    <a className="nav-link px-0" aria-current="page" href="https://www.facebook.com/UBIKON" target="_blank">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link px-0" aria-current="page" href="https://in.linkedin.com/company/ubikontechnologies"><i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link px-0" aria-current="page" href="https://www.youtube.com/@ubikontechnologies171"><i className="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link px-0" aria-current="page" href="https://www.instagram.com/ubikontechnologies/"><i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-6 ">
              <h5 className='fw-bold'>Links</h5>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="#">About Us</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="#">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="#">News</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="#">Projects</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="#">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h5 className='fw-bold'>Pages</h5>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="#">About Us</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="#">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="#">News</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="#">Projects</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="#">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className='col-md-3 mt-4 mt-md-0'>
              <h5 className='fw-bold mb-4'>Subscribe Newsletter</h5>
              <form>
                <div className='newsletter-form'>
                  <div className=''>
                    <input className='input-newsletter' placeholder='' type='text' />
                  </div>
                  <button className='default-btn disabled'>Subcribe</button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="text-center copyright">
            <WhatsApp />
            <Chatbot />
            <button className="msg-btn" onClick={() => setActive(!sidebarmenu)}>
              <MdOutlineMailOutline />
            </button>
            {/* <PhoneCallButton/> */}
            <p>© Ubikon Technologies PVT. LTD. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <div>

        {/* Section Jisme Class Add/Remove Hogi */}
        <section className={`content-box ${sidebarmenu ? "active" : ""}`}>
          <button className="crose" onClick={() => setActive(!sidebarmenu)}><RxCross2 /> </button>
          <h4 className="fw-bold mb-3">About Us</h4>
          <p>Ubikon is a trusted and renowned service provider, offering top-notch digital solutions and business services. Our expertise helps businesses reach new heights with innovative and reliable solutions.</p>
          <button className="default-btn mt-4">Let’s Talk With Ubikon AI</button>
          <div className="contact-info mt-5">
            <h5 className="fw-bold mb-4">Contact Information</h5>
            <p>
              <a href="tel:+916264818989" className="flex items-center text-blue-600 hover:underline">
                <IoCallOutline className="mr-2" /> +91 6264818989
              </a>
            </p>
            <p>
              <a href="mailto:contact@ubikon.in" className="flex items-center text-blue-600 hover:underline">
                <MdOutlineMailOutline className="mr-2" /> contact@ubikon.in
              </a>
            </p>
            <p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=C21+Mall,+Scheme+54+PU4+Vijay+Nagar,+Indore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:underline"
              >
                <LuMapPin className="mr-2" /> C21 Mall, Scheme 54 PU4 Vijay Nagar, Indore
              </a>
            </p>
            <div className='d-flex mt-3'>
              <ul className="nav widget-social">
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="https://www.facebook.com/UBIKON" target="_blank">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="https://in.linkedin.com/company/ubikontechnologies"><i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="https://www.youtube.com/@ubikontechnologies171"><i className="fa-brands fa-youtube"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link px-0" aria-current="page" href="https://www.instagram.com/ubikontechnologies/"><i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
            {/* Form page */}
            <form className="mt-5" onSubmit={handleSubmit}>
              <h5 className="mb-4 fw-bold">Ready to Get Started?</h5>
              <div className="mb-3">
                <input type="text" name="yourName" className="form-control" placeholder="Your name" value={formData.yourName} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="email" name="email" className="form-control" data-error="Please enter your email" placeholder="Your email address" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <input type="text" name="contactNumber" className="form-control" data-error="Please enter your phone number" placeholder="Phone" value={formData.contactNumber} onChange={handleChange} />
              </div>
              <div className="mb-3">
                {/* <span className="icon"><i className="fa-solid fa-info"></i></span> */}

                <select name="subject" value={formData.subject} onChange={handleChange} required>
                  <option value="">Select Services</option>
                  {subjects.map((subj, index) => (
                    <option key={index} value={subj}>{subj}</option>
                  ))}
                </select>

              </div>
              <div className="mb-3">
                <textarea name="textMessage" className="form-control" cols="30" rows="6" data-error="Please enter your message" placeholder="Write your message..." value={formData.textMessage} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="default-btn mt-5" disabled={loading}>  {loading ?  "Submitting..." :"Send Message"}</button>
            </form>

          </div>
        </section>
      </div>
    </>
  )
}

export default Footer