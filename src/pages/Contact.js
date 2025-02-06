import React from 'react';
import Navbar from '../components/Navbar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Logo from '../assets/img/logo.png';
import appointment from '../assets/img/appointment.png';
import AD from '../assets/img/address.png';
import PH from '../assets/img/phone.png';
import clLogo from '../assets/img/cl1.png';



const contact = () => {
 
  return (
    <div className='col-sm-12'>
      <Navbar />
      <div className="contact">
          <div className="contact-details-section bg-bectangle-bottom">
              <div className="container">
                  <div className="text-center cnt-heading"><h3>Contact</h3></div>
                  <div className='row'>
                      <div className='col-sm-4 text-center'>
                          <img className='mb-2' src={appointment} />
                          <h5 className='mb-3'>Open hours</h5>
                          <p className='mb-1'>Mon-Fri: 9 AM - 6 PM</p>
                          <p className='mb-1'>Saturday: 9 AM - 4 PM</p>
                          <p className='mb-0 text-warning'>Sunday : Closed</p>
                      </div>
                      <div className='col-sm-4 text-center'>
                          <img className='mb-2' src={AD} />
                          <h5 className='mb-3'>Open hours</h5>
                          <p className='mb-1'>C21 Mall, Scheme 54 PU4</p>
                          <p className='mb-1'>Vijay Nagar, Indore</p>
                          <p className='mb-0'><a href='' className='text-warning'> See Location </a> </p>
                      </div>
                      <div className='col-sm-4 text-center'>
                          <img className='mb-2' src={PH} />
                          <h5 className='mb-3'>Get in touch</h5>
                          <p className='mb-1'>Mobile : +91 6264818989</p>
                          <p className='mb-1'>Email : contact@ubikon.in</p>
                          <p className='mb-0'><a href='' className='text-warning'> Contact form </a></p>
                      </div>
                  </div>
              </div>  
          </div>
          <div className='map-location'>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.738940764389!2d75.85772567527867!3d22.71956802853062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fc4a1f2c2c15%3A0x4c7b48dd3a5cb7fc!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1707056094323!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: "0" }} // Correct way to pass style
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

          </div>
            <div className='container'>
          <div className="contact-section">
              {/* Contact Details */}
              <div className="contact-details">
                <h2>Have questions? <br /> Get in touch!</h2>
                <p>Adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
                <ul>
                  <li><i class="fas fa-map-marker-alt"></i> C21 Mall, Scheme 54 PU4 Vijay Nagar, Indore</li>
                  <li><i class="fas fa-mobile-alt"></i> +91 6264818989</li>
                  <li><i class="fas fa-envelope"></i> contact@ubikon.in</li>
                </ul>
              </div>

              {/* Contact Form */}
              <div className="contact-form">
                <form>
                  <div className="row">
                    <div className="form-group col-sm-6">
                      <span className='icon'><i class="fa-regular fa-user"></i></span>
                      <input type="text" placeholder="Name" required />
                    </div>
                    <div className="form-group col-sm-6">
                      <span className='icon'><i class="fa-regular fa-envelope"></i></span>
                      <input type="email" placeholder="Email Address" required />
                    </div>
                  </div>  
                  <div className="row">
                    <div className="form-group col-sm-6">
                       <span className='icon'><i class="fa-solid fa-phone"></i></span>
                      <input type="text" placeholder="Phone" />
                    </div>
                    <div className="form-group col-sm-6">
                    <span className='icon'><i class="fas fa-info-circle"></i></span>
                    <input type="text" placeholder="Subject" />
                    </div>
                  </div>   
                  <div className='form-group'>
                    <span className='icon'><i class="fas fa-pencil-alt"></i></span>
                    <textarea placeholder="How can we help you? Feel free to get in touch!" required></textarea>
                  </div>  
                  <label>
                    <input className="w-auto" type="checkbox" required /> I agree that my data is collected and stored.
                  </label>
                  <button type="submit" className='default-btn mt-5'>Get In Touch</button>
                </form>
              </div>
            </div>  
           </div>
      {/* Partners */}
      <div className="partners">
        <div className='partnerlg'> <img src={clLogo} alt="Partner 1" /> </div>
        <div className='partnerlg'> <img src={clLogo} alt="Partner 2" /> </div>
        <div className='partnerlg'> <img src={clLogo} alt="Partner 3" /> </div>
        <div className='partnerlg'> <img src={clLogo} alt="Partner 4" /> </div>
        <div className='partnerlg'> <img src={clLogo} alt="Partner 5" /> </div>
      </div>
      </div>
      
      <footer className="bg-black text-white">
        <div className="container">
          <div class="footer-shape-1">
            <img src="https://templates.envytheme.com/coze/default/assets/images/footer/footer-shape-1.png" alt="image" />
          </div>
          <div class="footer-shape-3">
            <img src="https://templates.envytheme.com/coze/default/assets/images/footer/footer-shape-3.png" alt="image" />
          </div>
          <div className="row">
            {/* About Section */}
            <div className="col-md-3">

              <a class="nav-link px-0 my-3" aria-current="page" href="#"><img width={139} src={Logo} /></a>
              <p>Empowering Your Business with Expert Mobile App & Website Development</p>
              <div className='d-flex mt-3'>
                <ul class="nav widget-social">
                  <li class="nav-item">
                    <a class="nav-link px-0" aria-current="page" href="#"><i class="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link px-0" aria-current="page" href="#"><i class="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link px-0" aria-current="page" href="#"><i class="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link px-0" aria-current="page" href="#"><i class="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 ">
              <h5 className='fw-bold'>Links</h5>
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link px-0" aria-current="page" href="#">About Us</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-0" aria-current="page" href="#">Services</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-0" aria-current="page" href="#">News</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-0" aria-current="page" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-0" aria-current="page" href="#">Projects</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 ">
              <h5 className='fw-bold'>Pages</h5>
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link px-0" aria-current="page" href="#">About Us</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-0" aria-current="page" href="#">Services</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-0" aria-current="page" href="#">News</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-0" aria-current="page" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-0" aria-current="page" href="#">Projects</a>
                </li>
              </ul>
            </div>
            <div className='col-md-3'>
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
            <p>© Ubikon Technologies PVT. LTD. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default contact;
