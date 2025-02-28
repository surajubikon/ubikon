import React, { useState, useEffect, useRef } from "react";
import axios from "../../utils/axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
import BundledEditor from './bundled'; // Import BundledEditor (TinyMCE)
import { toast } from "react-toastify";

const JobCollection = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [editJobCollectionId, setJobCollectionId] = useState(null);
  const editorRef = useRef(null); // ✅ Added useRef


  const [newJob, setNewJob] = useState({
    title: "",
    category: "",
    experience: "",
    deadline: "",
    description: "",
    content: "",
    status: "Active",
    dynamicFields: [], // ✅ Dynamic fields array
    thumbnail: null,
    previewImage: null,
  });

  const [editingJob, setEditingJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/jobCollection/get");
      setJobs(res.data);
      console.log("respomnses", res)
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/jobCategory/get-job");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.keys(newJob).forEach((key) => {
        if (newJob[key]) {
          if (key === "dynamicFields") {
            formData.append(key, JSON.stringify(newJob[key])); // ✅ Convert to JSON
          } else {
            formData.append(key, newJob[key]);
          }
        }
      });

      if (editingJob) {
        await axios.put(`http://localhost:8000/api/jobCollection/${editingJob._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
                toast.success("Job Collection updated successfully!");
        
      } else {
        await axios.post("http://localhost:8000/api/jobCollection/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Job Collection Created successfully!");

      }

      setNewJob({
        title: "",
        category: "",
        experience: "",
        deadline: "",
        description: "",
        content: "",
        status: "Active",
        dynamicFields: [],
        thumbnail: null,
        previewImage: null,
      });
      setEditingJob(null);
      setShowForm(false);
      fetchJobs();
    } catch (error) {
   toast.error("Error uploading data: " + (error.response?.data?.message || "Something went wrong!"));
     
    }
  };

  const handleFileChange = (e, field) => {
    setNewJob({ ...newJob, [field]: e.target.files[0] });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/jobCollection/${id}`);
      fetchJobs();
            toast.success("Job Collection deleted successfully!");
      
    } catch (error) {
           toast.error("Error deleting data: " + (error.response?.data?.message || "Something went wrong!"));
     
    }
  };

  // ✅ Add Dynamic Field
  const addDynamicField = () => {
    setNewJob({ ...newJob, dynamicFields: [...newJob.dynamicFields, { heading: "", value: "" }] });
  };

  // ✅ Remove Dynamic Field
  const removeDynamicField = (index) => {
    const updatedFields = newJob.dynamicFields.filter((_, i) => i !== index);
    setNewJob({ ...newJob, dynamicFields: updatedFields });
  };

  // ✅ Update Dynamic Field
  const handleDynamicFieldChange = (index, field, value) => {
    const updatedFields = newJob.dynamicFields.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setNewJob({ ...newJob, dynamicFields: updatedFields });
  };

  return (
    <div className="container mt-4">
      {showForm ? (
        <div>
          <h2>{editingJob ? "Edit Job" : "Add Job"}</h2>
          <input type="text" className="form-control mb-2" placeholder="Title" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} />

          <select className="form-control mb-2" value={newJob.category} onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          <input type="text" className="form-control mb-2" placeholder="Experience" value={newJob.experience} onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })} />
          <input type="date" className="form-control mb-2" value={newJob.deadline} onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })} />
          <textarea className="form-control mb-2" placeholder="Description" value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}></textarea>

          {/* ✅ Dynamic Fields */}
          <h5>Add More</h5>
          {newJob.dynamicFields.map((field, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <input type="text" className="form-control" placeholder="Titel" value={field.heading} onChange={(e) => handleDynamicFieldChange(index, "heading", e.target.value)} />
              <input type="text" className="form-control" placeholder="passage" value={field.value} onChange={(e) => handleDynamicFieldChange(index, "value", e.target.value)} />
              <button className="btn btn-danger" onClick={() => removeDynamicField(index)}>Remove</button>
            </div>
          ))}
          <button className="btn btn-secondary mb-3" onClick={addDynamicField}>+ Add Field</button>
          < br />
          <label>Content</label>
          <BundledEditor
            onInit={(_evt, editor) => editorRef.current = editor}
            initialValue={newJob.content}

            init={{
              height: 400,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'link', 'lists', 'searchreplace',
                'table', 'wordcount', 'code', 'directionality', 'media', 'preview', 'image', 'emoticons'
              ],
              toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | media preview image emoticons',
            }}
            onChange={() => {
              if (editorRef.current) {
                setNewJob({ ...newJob, content: editorRef.current.getContent() });
              }
            }}

          />
          <label>Thumbnail:</label>
          <input type="file" className="form-control mb-2" onChange={(e) => handleFileChange(e, "thumbnail")} />
          <label>Preview Image:</label>
          <input type="file" className="form-control mb-2" onChange={(e) => handleFileChange(e, "previewImage")} />

          <button className="btn btn-danger position-absolute top-0 end-0 m-3" onClick={() => setShowForm(false)}>Cancel</button>
          <button className="btn btn-success" onClick={handleSubmit}>{editingJob ? "Update" : "Create"}</button>
        </div>
      ) : (
        <div>
          <h2 className="mb-3">Job Collection</h2>
          <button className="btn btn-primary mb-3" onClick={() => setShowForm(true)}>Add Job</button>

          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Experience</th>
                <th>Deadline</th>
                <th>Description</th>
                <th>images</th>
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
                    <img
                      src={job.thumbnail}
                      alt="Thumbnail"
                      style={{ width: "80px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                    />
                  </td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => { setEditingJob(job); setNewJob(job); setShowForm(true); }}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(job._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default JobCollection;
