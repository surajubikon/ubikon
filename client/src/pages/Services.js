import React from "react";
import Navbar from '../components/Navbar';
import Banner from '../assets/img/service-img.png';
import srv1 from '../assets/img/srvimg1.png';
import srv2 from '../assets/img/srvimg2.png';
import srv3 from '../assets/img/srvimg3.png';
import srv4 from '../assets/img/srvimg4.png';
import serviceimg1 from '../assets/img/service-img1.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const ServicePage = () => {
  
  const services = {
    dots: false,              // Show navigation dots
    infinite: true,          // Infinite scrolling
    speed: 500,              // Transition speed in ms
    slidesToShow: 3,         // Number of slides to show
    slidesToScroll: 1,    // Number of slides to scroll
    autoplay: true,          // Enable autoplay
    autoplaySpeed: 3000,     // Delay between transitions
    arrows: false,            // Show next/prev arrows
  };
  return (
    <>
      <Navbar />
      <div className="services-section">
        <div className="relative w-full">
          <div className="">
            <img
              src={Banner}
              alt="Banner"
              className="w-100 h-64 object-cover"
            />
            <div className="sr-title">
              <div className="">
                <h2 className="fw-bold">Our Services</h2>
                <p>We Provide Perfect IT Solutions for Your Business</p>
              </div>  
            </div>  
          </div>  

          <div className="sec-card-conten top-10 left-1/2 transform -translate-x-1/2 flex gap-4">
            <div className="container">
              <div className="row">
                  <div className="col-sm-3">
                    <div  className="bg-white p-4 shadow-lg rounded-lg w-40 text-center">
                      <div className="imgsr"> <img src={srv1} className="w-full h-24 object-cover rounded-md" /> </div>
                      <h6 className="mt-2 text-lg fw-bold">Website Development</h6>
                    </div>
                  </div>  
                  <div className="col-sm-3">
                    <div  className="bg-white p-4 shadow-lg rounded-lg w-40 text-center">
                      <div className="imgsr"> <img src={srv2} className="w-full h-24 object-cover rounded-md" /> </div>
                      <h6 className="mt-2 text-lg fw-bold">UI UX DESIGN</h6>
                    </div>
                  </div>  
                  <div className="col-sm-3">
                    <div  className="bg-white p-4 shadow-lg rounded-lg w-40 text-center">
                      <div className="imgsr"> <img src={srv3} className="w-full h-24 object-cover rounded-md" /> </div>
                      <h6 className="mt-2 text-lg fw-bold">App Development</h6>
                    </div>
                  </div>  
                  <div className="col-sm-3">
                    <div  className="bg-white p-4 shadow-lg rounded-lg w-40 text-center">
                      <div className="imgsr"> <img src={srv4} className="w-full h-24 object-cover rounded-md" /> </div>
                      <h6 className="mt-2 text-lg fw-bold">Digital Marketing</h6>
                    </div>
                  </div>  
              </div>  
            </div>  
          </div>
          <div className="our-top-serv">
            <div className="our-title">
              <h2 className="fw-bold">Our Top Services</h2>
              <p>We ensure you have every functionality you need to build, run, and expand your marketplace</p>
            </div>  
            <div className="container">
              <div className="row">
              <Slider {...services}>
                <div className="">
                  <div className="card text-center" >
                      <div className="text-center"><img src={serviceimg1} className="card-img-top" alt="Card Image" /></div> 
                      <div className="card-body">
                          <h5 className="card-title">Google / Meta Ads</h5>
                          <p className="card-text">Get more website traffic, more customers & more online visibility with powerful SEO services.</p>
                      </div>
                  </div>
                </div>  

<div className="">
  <div className="card text-center">
      <div className="text-center"><img src={serviceimg1} className="card-img-top" alt="Card Image" /></div> 
      <div className="card-body">
          <h5 className="card-title">Google / Meta Ads</h5>
          <p className="card-text">Get more website traffic, more customers & more online visibility with powerful SEO services.</p>
      </div>
  </div>
</div>  

<div className="">
  <div className="card text-center">
      <div className="text-center"><img src={serviceimg1} className="card-img-top" alt="Card Image" /></div> 
      <div className="card-body">
          <h5 className="card-title">Google / Meta Ads</h5>
          <p className="card-text">Get more website traffic, more customers & more online visibility with powerful SEO services.</p>
      </div>
  </div>
</div>  

               </Slider> 
              </div>
            </div>  
          </div>
        </div>

        
      </div>
    </>  
  );
};

export default ServicePage;
