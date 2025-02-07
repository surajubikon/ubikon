import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostCategoryPage.css';

function PostCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Track if we're in edit mode
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    seoTitle: '',
    seoMetaDescription: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories on page load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories/create');
      setCategories(response.data);
    } catch (error) {
      setError('Error fetching categories');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditMode) {
        // Update category
        await axios.put(`http://localhost:5000/api/categories/update/${currentCategoryId}`, formData);
        setCategories(categories.map((category) =>
          category._id === currentCategoryId ? { ...category, ...formData } : category
        ));
      } else {
        // Create category
        const response = await axios.post('http://localhost:5000/api/categories/create', formData);
        setCategories((prev) => [...prev, response.data]); // Update categories list
      }

      setFormData({
        name: '',
        slug: '',
        seoTitle: '',
        seoMetaDescription: ''
      });
      setShowModal(false); // Close modal after submission
    } catch (error) {
      setError('Failed to save category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      slug: category.slug,
      seoTitle: category.seoTitle,
      seoMetaDescription: category.seoMetaDescription
    });
    setCurrentCategoryId(category._id);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/delete/${categoryId}`);
      setCategories(categories.filter((category) => category._id !== categoryId)); // Remove category from the list
    } catch (error) {
      setError('Failed to delete category. Please try again.');
    }
  };

  return (
    <div className="post-category-page">
      <button className="add-category-btn" onClick={() => { setShowModal(true); setIsEditMode(false); }}>
        Add Category
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditMode ? 'Edit Post Category' : 'Create Post Category'}</h3>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Category Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="slug">Slug</label>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="seoTitle">SEO Title</label>
                <input
                  type="text"
                  name="seoTitle"
                  id="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="seoMetaDescription">SEO Meta Description</label>
                <input
                  type="text"
                  name="seoMetaDescription"
                  id="seoMetaDescription"
                  value={formData.seoMetaDescription}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
              </button>
            </form>
            <button onClick={() => setShowModal(false)} className="close-btn">X</button>
          </div>
        </div>
      )}

      <div className="categories-list">
        <h3>Categories List</h3>
        {categories.length === 0 ? (
          <p>No categories available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>SEO Title</th>
                <th>SEO Meta Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td>{category.seoTitle}</td>
                  <td>{category.seoMetaDescription}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(category)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(category._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PostCategoryPage;
