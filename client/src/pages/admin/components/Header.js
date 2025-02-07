import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaChevronDown, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
// import "./styles.css";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="header">
      <h1>Dashboard</h1>

      <div className="header-right">
        {/* Notification Bell */}
        <div className="notification">
          <FaBell />
          <span className="badge">3</span>
        </div>

        {/* Profile Dropdown */}
        <div className="profile" onClick={() => setShowDropdown(!showDropdown)}>
          <div className="profile-pic">
            <FaUserCircle />
            <span>Admin</span>
            <FaChevronDown />
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              <a href="#"><FaUser /> Profile</a>
              <a href="#"><FaCog /> Settings</a>
              <a href="#"><FaSignOutAlt /> Logout</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
