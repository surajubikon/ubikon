import React, { useEffect, useState } from 'react';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import api, { baseURL } from '../../API/api.url';
import axios from 'axios';

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}${api.contact.getContacts.url}`);
        setTotalUsers(response.data.length);
         console.log("user",response)
      } catch (err) {
        setError("Failed to fetch user count");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalUsers();
  }, []);
 return (
  <div className='admin'>

    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard">
          <div className='col-sm-3'>
            <div className="card">
            <h3>Total Users</h3>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <p>{totalUsers}</p>
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
