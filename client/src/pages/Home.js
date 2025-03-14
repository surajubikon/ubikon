import React from 'react';
import Navbar from '../components/Navbar';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import slidesshape1 from '../assets/img/slides-shape-1.png'
import slidesandroid1 from '../assets/img/slides-android1.png'
import slidesshape3 from '../assets/img/slides-shape-3.png'
import slidesshape4 from '../assets/img/slides-shape-4.png'
import TM1 from '../assets/img/tm-1.png'
import { Helmet } from 'react-helmet';

import Wsimg from '../assets/img/ws-img.webp';
import slides1 from '../assets/img/slides-1.webp';
// import slides2 from '../assets/img/slides-2.webp';
import slidesbg from '../assets/img/slidesbg.webp';
import FB from '../assets/img/fb.png';
import IN from '../assets/img/insta.png';
import Link from '../assets/img/link.png';
import JD from '../assets/img/jd.png';
import MAP from '../assets/img/map.png';

import Project from "../pages/admin/Project";
import Service from '../pages/Service.js';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
// import Testimonials from './testimonials.js';
import Testimonials from './Testimonials.js';

const Home = () => {
  const testimonial = {

    dots: false,              // Hide navigation dots
    infinite: true,           // Enable infinite scrolling
    speed: 500,               // Transition speed in ms
    slidesToShow: 3,          // Default slides to show (Desktop)
    slidesToScroll: 1,        // Number of slides to scroll
    autoplay: true,           // Enable autoplay
    autoplaySpeed: 3000,      // Delay between transitions
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Tablet pe 2 slides
          centerPadding: "20px"
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Mobile pe 1 slide
          centerPadding: "10px"
        }
      }
    ]
  };

  const navigate = useNavigate();
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Mobile App Development",
    "provider": {
      "@type": "Organization",
      "name": "Ubikon Technologies",
      "logo": "http://localhost:8000/path/to/logo.jpg",
      "url": "http://localhost:8000",
      "sameAs": [
        "https://www.facebook.com/UBIKON/",
        "https://www.linkedin.com/company/ubikontechnologies/"
      ]
    },
    "description": "Ubikon Technologies offers outstanding mobile app development services tailored to meet your business needs.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "1800"
    },
    "additionalType": "https://schema.org/SoftwareApplication"
  };

  return (
    <div className='col-sm-12' atl="Ubikon technologies and mobile app and website development company in Indore, Madhya Pradesh.">
      <Helmet>
        <meta name="description" content="Ubikon Technologies offers top-notch mobile app development services." />
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      </Helmet>

      <Navbar />

      <div className='main-slides-area' atl="Ubikon - Leading mobile app and website development company in Indore, Madhya Pradesh.">
        <div className='container'>
          <div className="main-slides-shape-1">
            <img src={slidesshape1} alt="image" />
          </div>
          <div className='main-slides-shape-2' >
            <img src={slidesandroid1} alt='' />
          </div>
          <div className='main-slides-shape-3' >
            <img src={slidesshape3} alt='' />
          </div>
          <div className='main-slides-shape-4' >
            <img src={slidesshape4} alt='' />
          </div>

          <div className='row'>
            <div className='col-12 col-xs-12 col-md-7'>
              <div className='main-slides-content'>
                <span className="" alt="Ubikon - Leading mobile app and website development company in Indore, Madhya Pradesh">Trusted by Leading Brands Worldwide</span>
                <h1 className="">Expert Mobile App & Website Development in Indore<span className="overlay" ></span></h1>
                <p className="">Elevate your brand with Ubikon Technologies. We specialize in custom mobile app development and responsive web solutions that drive growth and engagement. Discover the difference our expert team can make</p>
                <a href="contact" className="default-btn mt-5">Get Started Today!</a>
              </div>
            </div>
            <div className='col-md-5 position-relative'>
              <div className=''>
                <div className='main-slides-bg'>
                  <img width="100%" src={slidesbg} alt='sss' /> 
                </div>
              </div>  
                <div className='main-slides-image'>
                    <img className='slides1' src={slides1} alt='fff' />
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className='wt-we-do' atl="Ubikon - Leading mobile app and website development company in Indore, Madhya Pradesh.">
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='wt-we-do-conten' alt="Innovative mobile app and website development services by Ubikon, Indore, Madhya Pradesh.">
                <span className="">About Us</span>
                <h1 className="">Who We Are: Your Digital Transformation Partners</h1>
                <p>At Ubikon Technologies, we blend cutting-edge technology with innovative design to deliver exceptional mobile app and website development services. With over 8 years of experience, our talented team is dedicated to helping your business outshine the competition. Based in Indore, Madhya Pradesh, and serving clients globally, we are committed to driving digital transformation for your business.</p>
                <button className='default-btn mt-5'>Explore Our Journey and Vision!</button>
              </div>
            </div>
            <div className='col-md-6 mt-4 mt-md-0'>
              <img className='w-100' src={Wsimg} />
            </div>
          </div>
        </div>
      </div>
      <div className='services bg-bectangle-bottom' atl="Dedicated team of mobile app and website developers at Ubikon in Indore">
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='services-conten'>
                <span className="">Services</span>
                <h1 className="">Our Premier <br /> <b> Services </b></h1>
                <p>Ubikon Technologies offers a comprehensive range of technology solutions tailored to meet global business needs. Our core services include:</p>
                <button
                  className='default-btn mt-5'
                  onClick={() => navigate("/services")}
                >
                  Explore All Services
                </button>
              </div>
            </div>
            <div className='col-md-8 mt-5 mt-md-0'>
              <Service />
            </div>
          </div>
        </div>
      </div>
      <div className='who-we-are' atl='Expert mobile app development services provided by Ubikon.'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <img className='w-100' src="https://appgeeks.axiomthemes.com/wp-content/uploads/2023/04/img-22-copyright.png" />
            </div>
            <div className='col-md-6'>
              <div className='who-we-are-conten'>
                <span className="">Projects
                </span>
                <h1 className="">Our Success Stories</h1>
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
      <div className='testimonials bg-bectangle-top bg-bectangle-bottom' atl="Case study: Successful mobile app project developed by Ubikon for an e-commerce client">
        <div className='container' atl="Website development project success story by Ubikon enhancing online business presence.">
          <div className='row'>
            <div className='col-md-6'>
              <div className='testimonials-conten'>
                <span className="">What Our Clients Say
                </span>
                <h1 className="">Success Stories from <b>Satisfied Customers</b></h1>
                <p>Hear from our satisfied clients who have experienced transformative results with Ubikon Technologies.
                </p>
                <p>At Ubikon, we take pride in delivering exceptional digital solutions for businesses across the globe. For over 8+ years, our commitment to quality and customer satisfaction has garnered us a loyal clientele. Here’s what some of our clients have to say:
                </p>
                <button className='default-btn mt-5'>Ready to Start Your Success Story?</button>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='testimonials-item'>
                <div className='item-box'>
                  <img src='https://vue.envytheme.com/koze/img/testimonials-1.6896791a.jpg' />
                  <p> "Ubikon transformed our vision into a stunning mobile app that has garnered rave reviews from our users. Their team's expertise and commitment were evident from the start." </p>
                  <h4>— Aditi Sharma, CEO of Tech Innovators</h4>
                </div>
                <div className='item-box'>
                  <img src='https://vue.envytheme.com/koze/img/testimonials-2.06fe6281.jpg' />
                  <p> The website development services provided by Ubikon have completely revitalized our online presence. We’ve seen a significant increase in traffic and engagement since launch </p>
                  <h4>— Rajesh Mehta, Owner of Explore Indore</h4>
                </div>
                <div className='item-box'>
                  <img src='https://vue.envytheme.com/koze/img/testimonials-3.cba125a4.jpg' />
                  <p> "Working with Ubikon has been a game-changer for our business. Their digital marketing strategies have effectively increased our visibility and customer base" </p>
                  <h4>— Priya Khatri, Marketing Director of E-Commerce Solutions</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='blog-section' id="blog-section" atl="Client testimonial from local business about Ubikon’s mobile app development services.">
        <div className='container' atl='Happy clients sharing feedback on web development services provided by Ubikon.'>
          <div className='blog-heading'>
            <span>ARTICLE</span>
            <h2>Read Our Blog for the Latest Insights in <b>Technology</b></h2>
          </div>
          <div className='blog-slides'>
            <Project />
          </div>
        </div>
      </div>

      <div className='project-client-conten' atl="Happy clients sharing feedback on web development services provided by Ubikon">
        <div className='container'>
          <div className='card p-4 bg-black text-white text-center'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-3 box mb-3 pb-3 mb-md-0 pb-md-0'>
                  <h3 className='fw-bold'> 18+  </h3>
                  <h5> Year of <br /> Experience</h5>
                </div>
                <div className='col-md-3 box mb-3 pb-3 mb-md-0 pb-md-0'>
                  <h3 className='fw-bold'> 110+  </h3>
                  <h5> Project <br /> delivered  </h5>
                </div>
                <div className='col-md-3 box mb-3 pb-3 mb-md-0 pb-md-0'>
                  <h3 className='fw-bold'> 120+  </h3>
                  <h5> Satisfied <br /> Customers</h5>
                </div>
                <div className='col-md-3 box mb-3 pb-3 mb-md-0 pb-md-0'>
                  <h3 className='fw-bold'> 10+  </h3>
                  <h5>  Cities <br /> Worldwide</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonials />

      <div className="social-section" atl="Latest insights in technology from Ubikon's blog on mobile app development trends">
        <div className="container" atl="Exploring the future of website development in India - Ubikon blog post featured image">
          <div className="blog-heading">
            <span>Social Media</span>
            <h2>Let’s Grow Together<br /> on Social <b>Media</b></h2>
          </div>
          <div className='row row-cols-1  row-cols-md-5'>
            <div className='col'>
              <div className='social-icon text-center'>
              <a href="https://www.facebook.com/UBIKON" target="_blank" rel="noopener noreferrer">
                <img className='mb-3' src={FB} />
                </a>
                <p className='fw-bold' >20K+ Followers</p>
              </div>
            </div>
            <div className='col'>
              <div className='social-icon text-center'>
                <a href="https://www.instagram.com/ubikontechnologies/" target="_blank" rel="noopener noreferrer">
                  <img className='mb-3' src={IN} alt="Instagram ubikon" />
                </a>
                <p className='fw-bold'>20K+ Followers</p>
              </div>
            </div>

            <div className='col'>
              <div className='social-icon text-center'>
              <a href="https://in.linkedin.com/company/ubikontechnologies" target="_blank" rel="noopener noreferrer">
                <img className='mb-3' src={Link} atl="linkedin ubikon " />
                </a>
                <p className='fw-bold' >200K+ Connections</p>
              </div>
            </div>
            <div className='col'>
              <div className='social-icon text-center'>
              <a href="https://www.justdial.com/jdmart/Indore/Ubikon-Technologies-Pvt-Ltd-Above-Table-World-Vijay-Nagar/0731PX731-X731-190526210513-K8M4_BZDET/catalogue" target="_blank" rel="noopener noreferrer">
                <img className='mb-3' src={JD} />
                </a>
                <p className='fw-bold' >5 Star Rating</p>
              </div>
            </div>
            <div className='col'>
          
              <div className='social-icon text-center'>
              <a href='https://maps.app.goo.gl/cM4A7dkfQEC4wsVV9'>
                <img className='mb-3' src={MAP} atl="ubikon map , ubikon technologies" />
                </a>
                <p className='fw-bold' >800+ client visits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default Home;
