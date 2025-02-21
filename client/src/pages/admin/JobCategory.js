import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const JobCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://ubikon.in/api/jobCategory/get-job");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Add or Update Job Category
  const handleSubmit = async () => {
    try {
      if (editingCategory) {
        await axios.put(`https://ubikon.in/api/jobCategory/${editingCategory._id}`, { name: newCategory });
      } else {
        await axios.post("https://ubikon.in/api/jobCategory/create-job", { name: newCategory });
      }
      setNewCategory("");
      setEditingCategory(null);
      fetchCategories();
      document.getElementById("closeModal").click();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  // Delete Job Category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ubikon.in/api/jobCategory/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Job Category</h2>

      {/* Add Category Button */}
      <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#categoryModal">
        Add Jobs
      </button>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Job Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.jobCount}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#categoryModal"
                  onClick={() => { setEditingCategory(category); setNewCategory(category.name); }}
                >
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(category._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bootstrap Modal Fix */}
      <div className="modal fade" id="categoryModal" tabIndex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true" data-bs-backdrop="false">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="categoryModalLabel">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeModal">
                Close
              </button>
              <button type="button" className="btn btn-success" onClick={handleSubmit}>
                {editingCategory ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default JobCategory;
