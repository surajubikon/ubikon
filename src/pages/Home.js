import React from 'react';
import Navbar from '../components/Navbar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Logo from '../assets/img/logo.png';
import Wsimg from '../assets/img/ws-img.png';
import slides1 from '../assets/img/slides-1.png';
import slides2 from '../assets/img/slides-2.png';
import slidesbg from '../assets/img/slidesbg.png';
import Chatbot from './Chatbot';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';



const Home = () => {
  const settings = {
    dots: false,              // Show navigation dots
    infinite: true,          // Infinite scrolling
    speed: 500,              // Transition speed in ms
    slidesToShow: 3,         // Number of slides to show
    slidesToScroll: 1,    // Number of slides to scroll
    autoplay: true,          // Enable autoplay
    autoplaySpeed: 3000,     // Delay between transitions
    arrows: false,            // Show next/prev arrows
  };
  const blog = {
    dots: false,              // Show navigation dots
    infinite: true,          // Infinite scrolling
    speed: 500,              // Transition speed in ms
    slidesToShow: 2,         // Number of slides to show
    slidesToScroll: 1,    // Number of slides to scroll
    autoplay: true,          // Enable autoplay
    autoplaySpeed: 3000,     // Delay between transitions
    arrows: false,            // Show next/prev arrows
  };
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
                <p data-aos="fade-right" class="aos-init aos-animate">Welcome to Ubikon, your trusted partner in mobile app and website development. Based in Indore, Madhya Pradesh, we harness over 40 years of expertise to deliver cutting-edge digital solutions that elevate your business. From concept to execution, we ensure a seamless experience that drives results.</p>
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
                <p>We are technology solutions providing company all over the world doing over 40 years.</p>
                <button className='default-btn mt-5'>Explore All Services</button>
              </div>
            </div>
            <div className='col-md-8'>

              <Slider {...settings}>
                <div className=''>
                  <div className='services-item'>
                    <div className="services-image">
                      <img width="100%" src='https://templates.envytheme.com/coze/default/assets/images/services/services-4.jpg' />
                    </div>
                    <div class="services-content">
                      <h3>
                        <a href="services-details.html">Mobile App Development</a>
                      </h3>
                      <p> Transform your business ideas into stunning mobile applications. Our team specializes in user-friendly and scalable mobile app development for both Android and iOS platforms.</p>
                      <a href="services-details.html" class="services-btn">View More</a>
                    </div>
                  </div>
                </div>
                <div className=''>
                  <div className='services-item'>
                    <div className="services-image">
                      <img width="100%" src='https://templates.envytheme.com/coze/default/assets/images/services/services-1.jpg' />
                    </div>
                    <div class="services-content">
                      <h3>
                        <a href="services-details.html">Website Development</a>
                      </h3>
                      <p>  Elevate your online presence with our responsive and engaging website development services. We ensure that your website not only meets the latest standards in design and functionality but also attracts and converts visitors.</p>
                      <a href="services-details.html" class="services-btn">View More</a>
                    </div>
                  </div>
                </div>
                <div className=''>
                  <div className='services-item'>
                    <div className="services-image">
                      <img width="100%" src='https://templates.envytheme.com/coze/default/assets/images/services/services-3.jpg' />
                    </div>
                    <div class="services-content">
                      <h3>
                        <a href="services-details.html">UI/UX Design</a>
                      </h3>
                      <p>  User experience is at the heart of what we do. We create visually appealing and intuitive designs that engage users and enhance interaction.</p>
                      <a href="services-details.html" class="services-btn">View More</a>
                    </div>
                  </div>
                </div>
                <div className=''>
                  <div className='services-item'>
                    <div className="services-image">
                      <img width="100%" src='https://templates.envytheme.com/coze/default/assets/images/services/services-3.jpg' />
                    </div>
                    <div class="services-content">
                      <h3>
                        <a href="services-details.html">Digital Marketing</a>
                      </h3>
                      <p>  Drive traffic and potential customers to your website with our tailored digital marketing strategies, including SEO, PPC, and social media marketing.</p>
                      <a href="services-details.html" class="services-btn">View More</a>
                    </div>
                  </div>
                </div>
              

              </Slider>
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
                <p>At Ubikon, we take pride in delivering exceptional digital solutions for businesses across the globe. For over 40 years, our commitment to quality and customer satisfaction has garnered us a loyal clientele. Here’s what some of our clients have to say:
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
      <div className='blog-section'>
        <div className='container'>
          <div className='blog-heading'>
            <span>ARTICLE</span>
            <h2>Read Our Blog for the Latest Insights in <b>Technology</b></h2>
          </div>
          <div className='blog-slides'>
            <Slider {...blog}>
              <div class="blog-card">
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <div class="blog-image">
                      <a href="/koze/single-blog-1" class="">
                        <img src="https://vue.envytheme.com/koze/img/blog-1.9da8d82d.jpg" alt="image" />
                      </a>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="blog-content">
                      <div class="date">9th July, 2022</div>
                      <h3><a href="/koze/single-blog-1" class="">How Technology Dominate In The new World In 2022</a></h3>
                      <p>Lorem ipsum dolor sit amet conset sadipscing elitr sed diam nonumy eir m od tempor invidunt ut labore.</p>
                      <a href="/koze/single-blog-1" class="blog-btn">View More</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="blog-card">
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <div class="blog-image">
                      <a href="/koze/single-blog-1" class="">
                        <img src="https://vue.envytheme.com/koze/img/blog-1.9da8d82d.jpg" alt="image" />
                      </a>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="blog-content">
                      <div class="date">9th July, 2022</div>
                      <h3><a href="/koze/single-blog-1" class="">How Technology is Shaping the Future: Trends to Watch in 2023</a></h3>
                      <p>Summary: Explore the top technological advancements that are set to change our lives in the coming year. From AI to blockchain, discover what to expect.</p>
                      <a href="/koze/single-blog-1" class="blog-btn">View More</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="blog-card">
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <div class="blog-image">
                      <a href="/koze/single-blog-1" class="">
                        <img src="https://vue.envytheme.com/koze/img/blog-1.9da8d82d.jpg" alt="image" />
                      </a>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="blog-content">
                      <div class="date">9th July, 2022</div>
                      <h3><a href="/koze/single-blog-1" class="">The Importance of Mobile App Development for Business Growth</a></h3>
                      <p>Summary: Learn why investing in mobile apps is crucial for businesses today and how it can lead to increased engagement and revenue.</p>
                      <a href="/koze/single-blog-1" class="blog-btn">View More</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="blog-card">
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <div class="blog-image">
                      <a href="/koze/single-blog-1" class="">
                        <img src="https://vue.envytheme.com/koze/img/blog-1.9da8d82d.jpg" alt="image" />
                      </a>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="blog-content">
                      <div class="date">9th July, 2022</div>
                      <h3><a href="/koze/single-blog-1" class="">SEO Best Practices for 2023: How to Boost Your Website’s Visibility</a></h3>
                      <p>Summary: Discover the latest SEO strategies that can help your website rank higher in search results and attract more traffic.</p>
                      <a href="/koze/single-blog-1" class="blog-btn">View More</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="blog-card">
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <div class="blog-image">
                      <a href="/koze/single-blog-1" class="">
                        <img src="https://vue.envytheme.com/koze/img/blog-1.9da8d82d.jpg" alt="image" />
                      </a>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="blog-content">
                      <div class="date">9th July, 2022</div>
                      <h3><a href="/koze/single-blog-1" class="">UI/UX Design Trends: Enhancing User Experience in 2023</a></h3>
                      <p>Summary: This article discusses the latest UI/UX design trends and how they can significantly improve user satisfaction for your digital products.</p>
                      <a href="/koze/single-blog-1" class="blog-btn">View More</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="blog-card">
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <div class="blog-image">
                      <a href="/koze/single-blog-1" class="">
                        <img src="https://vue.envytheme.com/koze/img/blog-1.9da8d82d.jpg" alt="image" />
                      </a>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="blog-content">
                      <div class="date">9th July, 2022</div>
                      <h3><a href="/koze/single-blog-1" class="">The Rise of E-commerce: Essential Features for Your Online Store</a></h3>
                      <p>Summary: A comprehensive guide to the must-have features for an e-commerce website that can enhance customer experience and drive sales.</p>
                      <a href="/koze/single-blog-1" class="blog-btn">View More</a>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
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

          <Chatbot />
            <p>© Ubikon Technologies PVT. LTD. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default Home;
