import React from "react";
import { FaHome, FaUser, FaCogs, FaChartBar, FaSignOutAlt } from "react-icons/fa";
// import "./styles.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li className="active"><a href="#"><FaHome /> Dashboard</a></li>
        <li><a href="#"><FaUser /> Users</a></li>
        <li><a href="#"><FaCogs /> Settings</a></li>
        <li><a href="#"><FaChartBar /> Reports</a></li>
        <li><a href="#"><FaSignOutAlt /> Logout</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
