import React, { useState } from "react";
import { FaHome, FaUser, FaCogs, FaChartBar, FaSignOutAlt, FaQuoteLeft, FaCaretDown, FaClipboardList, FaBriefcase,FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isJobOpen, setIsJobOpen] = useState(false);
  const [leadManagement, setLeadManagement] = useState(false);


  // Toggle dropdown visibility for Service
  const toggleServiceDropdown = () => setIsServiceOpen(!isServiceOpen);
  const toggleJobDropdown = () => setIsJobOpen(!isJobOpen);
  const toggleLeadDropdown = () => setLeadManagement(!leadManagement);


  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li className="active">
          <Link to="/dashboard"><FaHome /> Dashboard</Link>
        </li>

        <li>
          <Link to="/enquiry"><FaClipboardList /> Enquiry Mails</Link>
        </li>
        <li>
          <Link to="/blog-list"><FaUser /> Blogs</Link>
        </li>
        <li>
          <Link to="/portfolio"><FaBriefcase /> Portfolio Uploads</Link>
        </li>
        <li>
          <Link to="/testimonials"><FaQuoteLeft /> Testimonials</Link>
        </li>

        {/* Service Dropdown */}
        <li>
          <div onClick={() => setIsServiceOpen(!isServiceOpen)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span><FaCogs /> Service</span>
            <FaCaretDown />
          </div>
          {isServiceOpen && (
            <ul style={{ listStyleType: 'none', paddingLeft: '15px' }}>
              <li><Link to="/category-list">Category</Link></li>
              <li><Link to="/sub-category-list">Sub Category</Link></li>
            </ul>
          )}
        </li>

        <li>
          <div onClick={() => setIsJobOpen(!isJobOpen)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span><FaBriefcase /> Jobs</span>
            <FaCaretDown />
          </div>
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
          <div onClick={toggleLeadDropdown} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <FaChartLine />Lead Management <FaCaretDown />
          </div>

          {leadManagement && (
            <ul style={{ listStyleType: 'none', paddingLeft: '10px', marginTop: '10px' }}>
              <ul style={{ listStyleType: 'none', paddingLeft: '10px' }}>
                <li><FaClipboardList /><Link to="/lead-list">Lead</Link></li>
                {/* <li><Link to="/job-collection">Job Collections</Link></li> */}
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
        <li>
          <Link to="/logout"><FaSignOutAlt /> Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
