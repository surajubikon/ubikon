import React, { useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import Logo from '../assets/img/logo.png';
import Chatbot from '../pages/Chatbot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import WhatsApp from '../pages/WhatsApp';

import AnimatedCursor from "react-animated-cursor"// import PhoneCallButton from '../pages/PhoneCallButton';
const Footer  = () => {
  
    const [sidebarmenu, setActive] = useState(false); // State for Toggle
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
          <div class="footer-shape-1">
            <img src="https://templates.envytheme.com/coze/default/assets/images/footer/footer-shape-1.png" alt="image" />
          </div>
          {/* <div class="footer-shape-3">
            <img src="https://templates.envytheme.com/coze/default/assets/images/footer/footer-shape-3.png" alt="image" />
          </div> */}
          <div className="row">
            {/* About Section */}
            <div className="col-md-3 mb-4 mb-md-0">

              <a class="nav-link px-0 my-3" aria-current="page" href="#"><img width={139} src={Logo} /></a>
              <p>Empowering Your Business with Expert Mobile App & Website Development</p>
              <div className='d-flex mt-3'>
                <ul class="nav widget-social">
                  <li class="nav-item">
                    <a class="nav-link px-0" aria-current="page" href="https://www.facebook.com/UBIKON" target="_blank">
                      <i class="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link px-0" aria-current="page" href="https://in.linkedin.com/company/ubikontechnologies"><i class="fa-brands fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link px-0" aria-current="page" href="https://www.youtube.com/@ubikontechnologies171"><i class="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link px-0" aria-current="page" href="https://www.instagram.com/ubikontechnologies/"><i class="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-6 ">
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
                <li class="nav-item">
                  <a class="nav-link px-0" aria-current="page" href="#">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
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
                <li class="nav-item">
                  <a class="nav-link px-0" aria-current="page" href="#">Contact Us</a>
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
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <button className="default-btn mt-4">Let’s Talk</button>
              <div className="contact-info mt-5">
                <h5 className="fw-bold mb-4">Contact Information</h5>
                <p className=""> <IoCallOutline /> +91 6264818989</p>
                <p className=""><MdOutlineMailOutline /> contact@ubikon.in</p>
                <p className=""><LuMapPin /> C21 Mall, Scheme 54 PU4 Vijay Nagar, Indore</p>
                <div className='d-flex mt-3'>
                  <ul class="nav widget-social">
                    <li class="nav-item">
                      <a class="nav-link px-0" aria-current="page" href="https://www.facebook.com/UBIKON" target="_blank">
                        <i class="fa-brands fa-facebook-f"></i>
                      </a>
                    </li>
      
                    <li class="nav-item">
                      <a class="nav-link px-0" aria-current="page" href="https://in.linkedin.com/company/ubikontechnologies"><i class="fa-brands fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link px-0" aria-current="page" href="https://www.youtube.com/@ubikontechnologies171"><i class="fa-brands fa-youtube"></i>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link px-0" aria-current="page" href="https://www.instagram.com/ubikontechnologies/"><i class="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <form className="mt-5">
                  <h5 className="mb-4 fw-bold">Ready to Get Started?</h5>
                  <div class="mb-3">
                    <input type="text" name="name" class="form-control" required="" data-error="Please enter your name" placeholder="Your name" />
                  </div>
                  <div class="mb-3">
                    <input type="email" name="email" class="form-control" required="" data-error="Please enter your email" placeholder="Your email address" />
                  </div>
                  <div class="mb-3">
                    <input type="text" name="phone_number" class="form-control" required="" data-error="Please enter your phone number" placeholder="Your phone number" />
                  </div>
                  <div class="mb-3">
                    <textarea name="message" class="form-control" cols="30" rows="6" required="" data-error="Please enter your message" placeholder="Write your message..."></textarea>
                  </div>
                  <button className="default-btn mt-5">Send Message</button>
                </form>
      
              </div>
            </section>
          </div>
    </>
  )
}

export default Footer