import React, { useState } from 'react';
import axios from 'axios';
import api, { baseURL } from '../API/api.url';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";

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
        <div className="container mt-5">
          <ToastContainer />
          <h2 className="text-center">Job Application</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="row">
              {['first', 'last', 'email', 'phone', 'currentCTC', 'expectedCTC', 'noticePeriod', 'portfolioLink or GithubLink'].map((field) => (
                <div className="col-md-6 mb-3" key={field}>
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
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Submitting...' : 'Apply Now'}
            </button>
          </form>
        </div>
  );
};

export default JobApplicationPage;
