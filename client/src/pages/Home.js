import React from 'react';
import Navbar from '../components/Navbar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Wsimg from '../assets/img/ws-img.png';
import slides1 from '../assets/img/slides-1.png';
import slides2 from '../assets/img/slides-2.png';
import slidesbg from '../assets/img/slidesbg.png';

import Project from "../pages/admin/Project";
import Service from '../pages/Service.js';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';



const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='col-sm-12'>
      <Navbar />

      <div className='main-slides-area bg-bectangle-bottom'>
        <div className='container'>
          <div class="main-slides-shape-1">
            <img src="https://templates.envytheme.com/coze/default/assets/images/home-slides/slides-shape-1.png" alt="image" />
          </div>
          <div className='main-slides-shape-2' >
            <img src='https://templates.envytheme.com/coze/default/assets/images/footer/footer-shape-1.png' />
          </div>
          <div className='main-slides-shape-3' >
            <img src='https://vue.envytheme.com/koze/img/projects-shape-3.03208ab8.png' />
          </div>
          <div className='main-slides-shape-4' >
            <img src='https://vue.envytheme.com/koze/img/projects-shape-2.e4150a75.png' />
          </div>

          <div className='row'>
            <div className='col-md-7'>
              <div className='main-slides-content'>
                <span data-aos="fade-right" class="aos-init aos-animate">Join Thousands of Satisfied Clients and Boost Your Online Success</span>
                <h1 data-aos="fade-right" class="aos-init aos-animate">Best IT Services for Your Business in Indore | Ubikon <span class="overlay" ></span></h1>
                <p data-aos="fade-right" class="aos-init aos-animate">Welcome to Ubikon, your trusted partner in mobile app and website development. Based in Indore, Madhya Pradesh, we harness over 8+ years of expertise to deliver cutting-edge digital solutions that elevate your business. From concept to execution, we ensure a seamless experience that drives results.</p>
                <a href="contact.html" class="default-btn mt-5">Get Started Today!</a>
              </div>
            </div>
            <div className='col-md-5'>
              <div className='main-slides-bg position-relative'>
                <img width="100%" src={slidesbg} />
                <div className='main-slides-image'>
                  <img className='slides1' src={slides1} />
                  <img className='slides2' src={slides2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='wt-we-do'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='wt-we-do-conten'>
                <span class="">About Us</span>
                <h1 class="">Who We Are: Your Digital Transformation Partners</h1>
                <p> Ubikon combines innovative technology with creative design to deliver exceptional mobile app and website development services. Our team of web gurus and digital guides is dedicated to ensuring your business outshines the competition. Recognized in Indore, Madhya Pradesh, and globally, we are committed to driving digital transformation for our clients.</p>
                <button className='default-btn mt-5'>Explore Our Journey and Vision!</button>
              </div>
            </div>
            <div className='col-md-6'>
              <img className='w-100' src={Wsimg} />
            </div>
          </div>
        </div>
      </div>
      <div className='services bg-bectangle-top bg-bectangle-bottom'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='services-conten'>
                <span class="">Services</span>
                <h1 class="">Our Premier <br /> <b> Services </b></h1>
                <p>We are technology solutions providing company all over the world doing over 8+ years.</p>
                <button
                  className='default-btn mt-5'
                  onClick={() => navigate("/services")}
                >
                  Explore All Services
                </button>
              </div>
            </div>
            <div className='col-md-8'>
              <Service />
            </div>
          </div>
        </div>
      </div>
      <div className='who-we-are'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <img className='w-100' src="https://appgeeks.axiomthemes.com/wp-content/uploads/2023/04/img-22-copyright.png" />
            </div>
            <div className='col-md-6'>
              <div className='who-we-are-conten'>
                <span class="">Projects
                </span>
                <h1 class="">Our Success Stories</h1>
                <p> Explore our portfolio to see how we have helped businesses in Indore and across the globe achieve their digital goals. Our client-centric approach ensures that we deliver exceptional results with every project.</p>
                {/* <button className='default-btn mt-5'>Discover Now</button> */}
              </div>
              <div>
                {/* <Project /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='testimonials bg-bectangle-top bg-bectangle-bottom'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='testimonials-conten'>
                <span class="">What Our Clients Say
                </span>
                <h1 class="">Success Stories from <b>Satisfied Customers</b></h1>
                <p>Discover the Sweet Talk of Our Happy Clients</p>
                <p>At Ubikon, we take pride in delivering exceptional digital solutions for businesses across the globe. For over 8+ years, our commitment to quality and customer satisfaction has garnered us a loyal clientele. Here’s what some of our clients have to say:
                </p>
                <button className='default-btn mt-5'>Ready to Start Your Success Story?</button>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='testimonials-item'>
                <div className='item-box'>
                  <img src='https://vue.envytheme.com/koze/img/testimonials-1.6896791a.jpg' />
                  <p> "Ubikon transformed our vision into a stunning mobile app that has garnered rave reviews from our users. Their team's expertise and commitment to our project were evident from the start." </p>
                  <h4>— Aditi Sharma, CEO of Tech Innovators</h4>
                </div>
                <div className='item-box'>
                  <img src='https://vue.envytheme.com/koze/img/testimonials-2.06fe6281.jpg' />
                  <p> "The website development services provided by Ubikon have completely revitalized our online presence. We’ve seen a significant increase in traffic and engagement since launch." </p>
                  <h4>— Rajesh Mehta, Owner of Explore Indore</h4>
                </div>
                <div className='item-box'>
                  <img src='https://vue.envytheme.com/koze/img/testimonials-3.cba125a4.jpg' />
                  <p> "Working with Ubikon has been a game-changer for our business. Their digital marketing strategies have effectively increased our visibility and customer base." </p>
                  <h4>— Priya Khatri, Marketing Director of E-Commerce Solutions</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='blog-section' id="blog-section">
        <div className='container'>
          <div className='blog-heading'>
            <span>ARTICLE</span>
            <h2>Read Our Blog for the Latest Insights in <b>Technology</b></h2>
          </div>
          <div className='blog-slides'>

            <Project />

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default Home;
