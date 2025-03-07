// ✅ All imports should be at the top
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { initGA, logPageView } from "./utils/analytics";  
import { LoaderProvider } from "./context/LoaderContext";

// ✅ Styles & Assets (CSS, Bootstrap)
import './App.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
import './assets/css/admin/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Pages (Frontend)
import Home from './pages/Home';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Demo from './pages/Demo';
import BlogListPage from './pages/BlogListPage';
import ServiceDetails from './pages/ServiceDetails';
import CareerDetails from './pages/CareerDetails.js';
import ServicesPageList from './pages/ServicePageList';
import JobApplicationPage from './pages/JobApplicationPage.js';
import JobRequirement from './pages/JobRequirement.js';

// ✅ Admin Pages
import PrivateRoute from './API/PrivateRoute';  
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import Enquiry from './pages/admin/Enquiry';
import BlogPages from './pages/admin/BlogPages';
import BlogDetails from './pages/admin/BlogDeatails';
import Register from './pages/admin/Register';
import ServicePage from './pages/admin/ServicePage';
import SubService from './pages/admin/SubService';
import JobCategory from './pages/admin/JobCategory';
import JobCollection from './pages/admin/JobCollection';
import PortFolio from './pages/admin/PortFolio';
import LeadList from './pages/admin/LeadManagement/LeadList.js';
import LeadAdd from './pages/admin/LeadManagement/LeadAdd.js';
import QuotationList from './pages/admin/LeadManagement/QuotationList.js';
import QuotationAdd from './pages/admin/LeadManagement/QuotationAdd.js';
import Quotation from './pages/admin/LeadManagement/Quotation.js';
import Milestone from './pages/admin/LeadManagement/Milestone.js';
import TestimonialPage from './pages/admin/Testimonial/TestimonialPage';
import JobApplication from './pages/admin/JobApplication/JobApplication';
import ActivityUbikon from './pages/admin/Activity-ubikon/Activity.js';
import NotFound from './pages/NotFound/NotFound';
import Project from './pages/admin/Project/Project.js';

function App() {
  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Transform your business with Ubikon Technologies..." />
        <meta name="keywords" content="Mobile App Development Indore, Website Development Indore, E-Commerce Solutions Indore," />
        <link rel="canonical" href="http://localhost:8000/" />
        <meta name="author" content="Ubikon Technologies" />
      </Helmet>

      <LoaderProvider>
        <Router>
          <Routes>
        
            {/* Frontend Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog-all-list" element={<BlogListPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services-details/:slug" element={<ServiceDetails />} />
            <Route path="/careerdetails" element={<CareerDetails />} />
            <Route path="/service-list/:slug" element={<ServicesPageList />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path='/register' element={<Register />} />
            <Route path='/jobapp-form' element={<JobApplicationPage />} />
            <Route path='/job-req' element={<JobRequirement />} />

            {/* Admin Pages */}
            <Route path="admin" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/enquiry" element={<PrivateRoute><Enquiry /></PrivateRoute>} />
            <Route path="/jobapplication" element={<PrivateRoute><JobApplication /></PrivateRoute>} />
            <Route path="/activity-ubi" element={<PrivateRoute><ActivityUbikon /></PrivateRoute>} />
            <Route path="/blog-list" element={<PrivateRoute><BlogPages/></PrivateRoute>} />
            <Route path="/portfolio" element={<PrivateRoute><PortFolio /></PrivateRoute>} />
            <Route path="/lead-list" element={<PrivateRoute> <LeadList /></PrivateRoute>}/>
            <Route path="/lead-add" element={<PrivateRoute> <LeadAdd /></PrivateRoute>}/>
            <Route path="/quotation-list" element={<PrivateRoute> <QuotationList /></PrivateRoute>}/>
            <Route path="/quotation-add" element={<PrivateRoute> <QuotationAdd /></PrivateRoute>}/>
            <Route path="/quotation" element={<PrivateRoute> <Quotation /></PrivateRoute>}/>
            <Route path="/milestone" element={<PrivateRoute> <Milestone /></PrivateRoute>}/>
            <Route path="/testimonials" element={<PrivateRoute><TestimonialPage /></PrivateRoute>} />
            <Route path="/projects" element={<PrivateRoute><Project /></PrivateRoute>} />
            <Route path="/job-category" element={<PrivateRoute><JobCategory /></PrivateRoute>} />
            <Route path="/job-collection" element={<PrivateRoute><JobCollection /></PrivateRoute>} />
            <Route path="/sub-category-list" element={<PrivateRoute><SubService /></PrivateRoute>} />
            <Route path="/category-list" element={<PrivateRoute><ServicePage /></PrivateRoute>} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
           
          </Routes>

        </Router>
        <ToastContainer position="top-right" autoClose={3000} />
      </LoaderProvider> 
    </>
  );
}

export default App;
