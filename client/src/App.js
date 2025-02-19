import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './API/PrivateRoute';  // Make sure the path is correct
import { Helmet } from 'react-helmet';
import logo from './logo.svg';
import './App.css';
import './assets/css/style.css'
import './assets/css/responsive.css'
import './assets/css/admin/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Demo from './pages/Demo';
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import UserDetails from './pages/admin/userDetails';
import Blogpage from './pages/admin/BlogPage.js';
import BlogDetails from './pages/admin/BlogDeatails.js';
// import About from './pages/About';
import Register from './pages/admin/Register.js';
import ServicePage from './pages/admin/ServicePage.js';
import NotFound from './pages/NotFound/NotFound.js';
import SubService from './pages/admin/SubService.js';
import ServiceDetails from './pages/ServiceDetails.js';
import ServicesPageList from './pages/ServicePageList.js';

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Top Mobile App & Website Development in Indore - Ubikon Technologies</title>
        <meta
          name="description"
          content="Transform your business with Ubikon Technologies. Specializing in mobile app development, website design, and e-commerce solutions in Indore. Elevate your online presence today!"
        />
        <meta name="keywords" content="Mobile App Development Indore, Website Development Indore, E-Commerce Solutions Indore," />
        <link rel="canonical" href="https://www.ubikon.in/" />
        <meta name="author" content="Ubikon Technologies" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TSXNG8NJ1S"></script>
           <script>
             {`
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', 'G-TSXNG8NJ1S');
             `}
           </script>
           </Helmet>
      <Router>
        <Routes>



          {/* frontend pages */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/ck" element={} */}
          <Route path="/contact" element={<Contact />} />
       
          <Route path="/services" element={<Services />} />
          <Route path="/services-details/:slug" element={<ServiceDetails />} />
          <Route path="/service-list/:slug" element={<ServicesPageList />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />




          <Route path='/register' element={<Register />} />
          {/* admin pages */}
          {/* <Route path="dashboard" element={<Dashboard />} /> 
              */}

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/blog-list" element={
            <PrivateRoute>
              <Blogpage />
            </PrivateRoute>
          } />

          <Route path="/category-list" element={
            <PrivateRoute>
              <ServicePage />
            </PrivateRoute>
          } />
           <Route path="/sub-category-list" element={
            <PrivateRoute>
              <SubService />
            </PrivateRoute>
          } />

          <Route path="admin" element={<Login />} />
          {/* Protected admin routes */}

          <Route path="/users" element={
            <PrivateRoute>
              <UserDetails />
            </PrivateRoute>
          } />

          {/* Protected route for dashboard */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
      <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
     
    </>
  );
}

export default App;
