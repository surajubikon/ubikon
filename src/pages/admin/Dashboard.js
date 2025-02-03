import React from 'react';

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";



const Dashboard = () => {
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
              <p>1,234</p>
            </div>
          </div>  
        </div>
      </div>
    </div>
  
  </div> // Ensure this is properly placed
  );
};

export default Dashboard;
