import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import api, { baseURL } from '../API/api.url';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";
import careerBg from "../assets/img/career-bg.jpg"; // Local image import

const JobApplicationPage = () => {
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    email: '',
    phone: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: '',
    resume: null,
    portfolioLink: '',
  });
   const [loading, setLoading] = useState(false);
   const [resumePreview, setResumePreview] = useState(null);
   const [fileSelected, setFileSelected] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setFormData({ ...formData, resume: file });
      setFileSelected(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('File size should be 5MB or less');
    }
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, resume: null });
    setResumePreview(null);
    setFileSelected(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      await axios.post(`${baseURL}${api.jobApplication.createJobApplication.url}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Application submitted successfully!');
      setFormData({
        first: '',
        last: '',
        email: '',
        phone: '',
        currentCTC: '',
        expectedCTC: '',
        noticePeriod: '',
        resume: null,
        portfolioLink: '',
      });
      setResumePreview(null);
      setFileSelected(false);
    } catch (error) {
      console.error('Error submitting application', error);
      toast.error('There was an error submitting your application.');
    }
    setLoading(false);
  };

      return (
      <>
        <Navbar />  
          <div className='job-apply'>
            <div
              className="d-flex flex-column align-items-center justify-content-center text-white text-center p-5 shadow-lg"
              style={{
                backgroundImage: `url(${careerBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "290px",
              }}
            >
              <h1 className="fw-bold mb-2">Job Application</h1>
              <p className="mb-4">Please ensure that all required fields are completed correctly before submitting the form</p>
              
            </div>
            <div className="container mt-5">
              <ToastContainer />
              <div className="text-center mb-5">
                <h2>Job Application</h2>
                <p>Tell us more about you so we can get back to you with more info.</p>
              </div>  
              <div className='col-md-8 m-auto'>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="row">
                    {['FirstName', 'LastName', 'Email', 'Phone', 'CurrentCTC', 'ExpectedCTC', 'NoticePeriod', 'PortfolioLink or GithubLink'].map((field) => (
                      <div className="col-md-12 mb-3" key={field}>
                        <input
                          type="text"
                          name={field}
                          className="form-control"
                          placeholder={field.replace(/([A-Z])/g, ' $1').trim()}
                          value={formData[field]}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  {!fileSelected && (
                    <div className="mb-3 file-upload-section border p-4 text-center">
                      <input
                        type="file"
                        name="resume"
                        id="resumeInput"
                        className="file-input d-none"
                        onChange={handleFileChange}
                        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                        required
                      />
                      <label htmlFor="resumeInput" className="file-label d-flex flex-column align-items-center justify-content-center" style={{ cursor: 'pointer' }}>
                        <FaPlus className="plus-icon mb-2" />
                        <span>Select a file</span>
                      </label>
                    </div>
                  )}
                  {resumePreview && (
                    <div className="mb-3 d-flex align-items-center">
                      {formData.resume && formData.resume.type && formData.resume.type.startsWith("image/") ? (
                        <img src={resumePreview} alt="Resume Preview" className="img-preview" style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain' }}/>
                      ) : (
                        <a href={resumePreview} target="_blank" rel="noopener noreferrer">
                          {formData.resume ? formData.resume.name : 'Resume Preview'}
                        </a>
                      )}
                      <button type="button" className="btn btn-danger btn-xs ms-2" onClick={handleRemoveFile} style={{ fontSize: '12px', padding: '2px 5px' }}>
                        &times; Remove
                      </button>
                    </div>
                  )}
                  <div className='text-center'>
                    <button type="submit" className="default-btn mt-5" disabled={loading}>
                      {loading ? 'Submitting...' : 'Apply Now'}
                    </button>
                  </div>  
                </form>
              </div>  
            </div>
          </div>  
        <Footer />
      </>  
      
  );
};

export default JobApplicationPage;
