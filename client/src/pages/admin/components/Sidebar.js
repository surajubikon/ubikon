import React from "react";
import { FaHome, FaUser, FaCogs, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Sidebar = () => {
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
          <Link to="/post-upload"><FaUser /> Post Upload</Link>
        </li>
        <li>
          <Link to="/categories"><FaCogs /> Categories</Link>
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
