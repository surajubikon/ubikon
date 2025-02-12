import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './API/PrivateRoute';  // Make sure the path is correct
import { Helmet } from 'react-helmet';
import logo from './logo.svg';
import './App.css';
import './assets/css/style.css'
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

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Ubikon - Mobile App & Website Development Services</title>
        <meta
          name="description"
          content="Ubikon offers top-notch mobile app and website development services in Indore, Madhya Pradesh."
        />
        <meta name="keywords" content="Mobile App Development, Website Development, Indore, Madhya Pradesh" />
        <link rel="canonical" href="https://yourwebsite.com/" />
      </Helmet>
      <Router>
        <Routes>



          {/* frontend pages */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
