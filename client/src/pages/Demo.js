import React, { useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";


import AnimatedCursor from "react-animated-cursor"




const ToggleSection = () => {
  const [sidebarmenu, setActive] = useState(false); // State for Toggle

  return (
    <div>
      
      <AnimatedCursor
      innerSize={8}
      outerSize={8}
      color='193, 11, 111'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
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
      {/* Button to Toggle Class */}
      <button className="btn btn-primary" onClick={() => setActive(!sidebarmenu)}>
        add
      </button>

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

  );
};

export default ToggleSection;
