import React, { useEffect, useState } from 'react';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import api, { baseURL } from '../../API/api.url';
import axios from 'axios';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalJobApplication, setTotalJobApplication] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}${api.contact.getContacts.url}`);
        setTotalUsers(response.data.length);
        
      } catch (err) {
        setError("Failed to fetch user count");
      } finally {
        setLoading(false);
      }
    };
const fetchTootalJobApplication = async () => {
      try {
        const response = await axios.get(`${api.jobApplicationForm.getJobApplications.url}`);
        setTotalJobApplication(response.data.length);
        
      } catch (err) {
        setError("Failed to fetch user count");
      } finally {
        setLoading(false);
      }
    }
    fetchTootalJobApplication();
    fetchTotalUsers();
  }, []);
 return (
  <div className='admin'>

    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard">
          <div className='col-sm-6'>
            <div className="card">
            <h3>Total Enquiry Mails</h3>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <p>{totalUsers}</p>
                )}
            </div>
          </div> 
          <div className='col-sm-6'>
            <div className="card">
            <h3>Total Job Application Form</h3>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <p>{totalJobApplication}</p>
                )}
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div> 
  );
};

export default Dashboard;
