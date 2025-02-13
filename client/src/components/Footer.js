import React from 'react'
import Logo from '../assets/img/logo.png';
import Chatbot from '../pages/Chatbot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import WhatsApp from '../pages/WhatsApp';
import PhoneCallButton from '../pages/PhoneCallButton';
function Footer() {
  return (
    <>
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
            <div className="col-md-3 mb-4 mb-md-0">

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
<WhatsApp/>
          <Chatbot />
          <PhoneCallButton/>
            <p>© Ubikon Technologies PVT. LTD. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer