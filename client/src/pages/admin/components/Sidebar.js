import React, { useState } from "react";
import { FaHome, FaUser, FaCogs, FaChartBar, FaSignOutAlt, FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Sidebar = () => {
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isJobOpen, setIsJobOpen] = useState(false);

  // Toggle dropdown visibility for Service
  const toggleServiceDropdown = () => setIsServiceOpen(!isServiceOpen);
  const toggleJobDropdown = () => setIsJobOpen(!isJobOpen);

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li className="active">
          <Link to="/dashboard"><FaHome /> Dashboard</Link>
        </li>

        <li>
          <Link to="/users"><FaUser /> Users</Link>
        </li>
        <li>
          <Link to="/blog-list"><FaUser /> BLOG</Link>
        </li>

        {/* Service Dropdown */}
        <li>
          <div onClick={toggleServiceDropdown} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <FaUser /> Service <FaCaretDown />
          </div>

          {/* Dropdown content */}
          {isServiceOpen && (
            <ul style={{ listStyleType: 'none', paddingLeft: '10px', marginTop: '10px' }}>
              <ul style={{ listStyleType: 'none', paddingLeft: '10px' }}>
                <li><Link to="/category-list">Category</Link></li>
                <li><Link to="/sub-category-list">Sub Category</Link></li>
                {/* <li><Link to="">Subcategory 2</Link></li> */}
              </ul>


            </ul>
          )}
        </li>
        {/* Job Dropdown */}
           <li>
          <div onClick={toggleJobDropdown} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <FaUser /> Jobs <FaCaretDown />
          </div>

          {/* Job content */}
          {isJobOpen && (
            <ul style={{ listStyleType: 'none', paddingLeft: '10px', marginTop: '10px' }}>
              <ul style={{ listStyleType: 'none', paddingLeft: '10px' }}>
                <li><Link to="/job-category">Job Category</Link></li>
                <li><Link to="/job-collection">Job Collections</Link></li>
                
              </ul>
              </ul>  
          )}
        </li>

        <li>
          <Link to="/settings"><FaCogs /> Settings</Link>
        </li>
        <li>
          <Link to="/reports"><FaChartBar /> Reports</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
