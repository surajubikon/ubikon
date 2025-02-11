import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostCategoryPage.css";

const API_URL = "http://localhost:8000/api/categories";

function PostCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    author: "",
    tags: "",
    categories: "",
    seoTitle: "",
    seoMetaDescription: "",
    seoKeywords: "",
    thumbnail: null,
    coverImage: null,
    status: "draft",
    publishedAt: "",
  });

  const [preview, setPreview] = useState({ thumbnail: null, coverImage: null });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch categories.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (file) {
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreview((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (isEditMode) {
        await axios.put(`${API_URL}/update/${currentCategoryId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        const response = await axios.post(`${API_URL}/create`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setCategories([...categories, response.data]);
      }

      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error(error);
      setError("Failed to save category.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      ...category,
      tags: category.tags.join(", "),
      categories: category.categories.join(", "),
      seoKeywords: category.seoKeywords.join(", "),
    });
    setCurrentCategoryId(category._id);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`${API_URL}/delete/${categoryId}`);
      setCategories(categories.filter((category) => category._id !== categoryId));
    } catch (error) {
      console.error(error);
      setError("Failed to delete category.");
    }
  };

  return (
    <div className="post-category-page">
      <button className="add-btn" onClick={() => { setShowModal(true); setIsEditMode(false); }}>
        + Add Category
      </button>

      {showModal && (
        <CategoryModal
          isEditMode={isEditMode}
          formData={formData}
          preview={preview}
          loading={loading}
          error={error}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}

      <CategoryList categories={categories} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
}

export default PostCategoryPage;

const CategoryModal = ({
  isEditMode,
  formData,
  preview,
  loading,
  error,
  handleChange,
  handleFileChange,
  handleSubmit,
  onClose,
}) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>{isEditMode ? "Edit Post Category" : "Create Post Category"}</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="slug" value={formData.slug} onChange={handleChange} placeholder="Slug" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
        <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" required></textarea>
        <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Author" required />
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" />
        <input type="text" name="categories" value={formData.categories} onChange={handleChange} placeholder="Categories (comma separated)" />
        <input type="text" name="seoTitle" value={formData.seoTitle} onChange={handleChange} placeholder="SEO Title" />
        <textarea name="seoMetaDescription" value={formData.seoMetaDescription} onChange={handleChange} placeholder="SEO Meta Description"></textarea>
        <input type="text" name="seoKeywords" value={formData.seoKeywords} onChange={handleChange} placeholder="SEO Keywords (comma separated)" />
        
        <label>Thumbnail:</label>
        <input type="file" name="thumbnail" onChange={handleFileChange} accept="image/*" />
        {preview.thumbnail && <img src={preview.thumbnail} alt="Thumbnail Preview" width="100" />}

        <label>Cover Image:</label>
        <input type="file" name="coverImage" onChange={handleFileChange} accept="image/*" />
        {preview.coverImage && <img src={preview.coverImage} alt="Cover Preview" width="100" />}

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <input type="datetime-local" name="publishedAt" value={formData.publishedAt} onChange={handleChange} />

        <button type="submit" disabled={loading}>{loading ? "Saving..." : isEditMode ? "Update" : "Create"}</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

const CategoryList = ({ categories, handleEdit, handleDelete }) => (
  <div className="categories-list">
    <h3>Categories List</h3>
    {categories.length > 0 ? (
      <table className="category-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Description</th>
            <th>Author</th>
            <th>Tags</th>
            <th>Categories</th>
            <th>SEO Title</th>
            <th>SEO Meta Description</th>
            <th>SEO Keywords</th>
            <th>Thumbnail</th>
            <th>Cover Image</th>
            <th>Status</th>
            <th>Published At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.title}</td>
              <td>{category.slug}</td>
              <td>{category.description}</td>
              <td>{category.author}</td>
              <td>{category.tags?.join(", ")}</td>
              <td>{category.categories?.join(", ")}</td>
              <td>{category.seoTitle}</td>
              <td>{category.seoMetaDescription}</td>
              <td>{category.seoKeywords?.join(", ")}</td>
              <td>
                {category.thumbnail ? (
                  <img src={category.thumbnail} alt="Thumbnail" width="50" />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                {category.coverImage ? (
                  <img src={category.coverImage} alt="Cover" width="50" />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{category.status}</td>
              <td>{new Date(category.publishedAt).toLocaleString()}</td>
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
    ) : (
      <p>No categories available</p>
    )}
  </div>
);
