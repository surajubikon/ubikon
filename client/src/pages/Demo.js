import React, { useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";





const ToggleSection = () => {
  const [sidebarmenu, setActive] = useState(false); // State for Toggle

  return (
    <div>
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
