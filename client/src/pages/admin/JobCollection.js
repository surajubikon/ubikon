import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import

const JobCollection = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]); // ✅ Categories State
  const [showModal, setShowModal] = useState(false);
  const [newJob, setNewJob] = useState({ title: "", category: "", experience: "", deadline: "", description: "" });
  const [editingJob, setEditingJob] = useState(null);

  // ✅ Fetch Jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/jobCollection/get");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/jobCategory/get-job"); // Change API if needed
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchCategories(); // Fetch categories
  }, []);

  // ✅ Handle Form Submission (Add/Edit)
  const handleSubmit = async () => {
    try {
      if (editingJob) {
        await axios.put(`http://localhost:8000/api/jobCollection/${editingJob._id}`, newJob);
      } else {
        await axios.post("http://localhost:8000/api/jobCollection/create", newJob);
      }
      setNewJob({ title: "", category: "", experience: "", deadline: "", description: "" });
      setEditingJob(null);
      setShowModal(false);
      fetchJobs();
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  // ✅ Delete Job
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/jobCollection/${id}`);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Job Collection</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>Add Job</button>

      {/* Job Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Experience</th>
            <th>Deadline</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.title}</td>
              <td>{categories.find(cat => cat._id === job.category)?.name || "Unknown"}</td>
              <td>{job.experience}</td>
              <td>{new Date(job.deadline).toLocaleDateString()}</td>
              <td>{job.description}</td>
              <td>
                <div className="d-flex flex-column gap-2">
                  <button className="btn btn-warning btn-sm me-3" onClick={() => { setEditingJob(job); setNewJob(job); setShowModal(true); }}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(job._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Form */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingJob ? "Edit Job" : "Add Job"}</h5>
                <button type="button" className="btn-close" onClick={() => { setShowModal(false); setEditingJob(null); setNewJob({ title: "", category: "", experience: "", deadline: "", description: "" }); }}></button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control mb-2" placeholder="Title" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} />

                {/* ✅ Category Dropdown */}
                <select className="form-control mb-2" value={newJob.category} onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>

                <input type="text" className="form-control mb-2" placeholder="Experience" value={newJob.experience} onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })} />
                <input type="date" className="form-control mb-2" value={newJob.deadline} onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })} />
                <textarea className="form-control mb-2" placeholder="Description" value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}></textarea>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => { setShowModal(false); setEditingJob(null); setNewJob({ title: "", category: "", experience: "", deadline: "", description: "" }); }}>Close</button>
                <button className="btn btn-success" onClick={handleSubmit}>{editingJob ? "Update" : "Add"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCollection;
