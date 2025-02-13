import React, { useEffect, useState } from "react";
import axios from "axios";
import './ServicePage.css'; // Import external CSS file

function ServicePage() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    ckeditor: "",
    coverImage: "",
    seometa:"",
    thumbnailFile: null,
    coverImageFile: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [editServiceId, setEditServiceId] = useState(null);

  // Fetch Services
  useEffect(() => {
    axios
      .get("https://ubikon.in/api/services/all")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Handle Add or Edit Service
  const handleAddOrEditService = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Append form fields including files
    form.append("title", formData.title);
    form.append("slug", formData.slug);
    form.append("description", formData.description);
    form.append("seometa", formData.seometa);
    form.append("ckeditor", formData.ckeditor);
    form.append("thumbnail", formData.thumbnailFile);
    form.append("coverImage", formData.coverImageFile);
    try {
      if (editServiceId) {
        // Editing an existing service
        const res = await axios.put(`https://ubikon.in/api/services/update/${editServiceId}`, form, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setServices(services.map(service => (service._id === editServiceId ? res.data : service)));
      } else {
        // Adding a new service
        const res = await axios.post("https://ubikon.in/api/services/create", form, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setServices([...services, res.data]);
      }
      setShowModal(false);
      setFormData({
        title: "",
        slug: "",
        description: "",
        seometa:"",
        thumbnail: "",
        ckeditor: "",
        coverImage: "",
        thumbnailFile: null,
        coverImageFile: null,
      });
      setEditServiceId(null);
      alert(editServiceId ? "Service updated successfully!" : "Service added successfully!");
    } catch (error) {
      console.error("Error saving service:", error.response?.data || error);
    }
  };

  // Handle Edit
  const handleEdit = (service) => {
    setEditServiceId(service._id);
    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description,
      seometa: service.seometa,
      thumbnail: service.thumbnail,
      ckeditor: service.ckeditor,
      coverImage: service.coverImage,
      thumbnailFile: null,
      coverImageFile: null,
    });
    setShowModal(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ubikon.in/api/services/delete/${id}`);
      setServices(services.filter(service => service._id !== id));
      alert("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  // Handle file change for thumbnail
  const handleThumbnailChange = (e) => {
    setFormData({ ...formData, thumbnailFile: e.target.files[0] });
  };

  // Handle file change for cover image
  const handleCoverImageChange = (e) => {
    setFormData({ ...formData, coverImageFile: e.target.files[0] });
  };

  return (
    <div className="servicepage-container">
      <button onClick={() => setShowModal(true)} className="add-service-btn">
        ➕ Add Service
      </button>

      {services.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table className="service-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Description</th>
              <th>SEO Meta</th>
              <th>Image</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>{service.title}</td>
                <td>{service.slug}</td>
                <td dangerouslySetInnerHTML={{ __html: service.description }} />
                <td>{service.seometa}</td>
                <td>
                  <img src={service.thumbnail} alt="Thumbnail" className="service-thumbnail" />
                  <img src={service.coverImage} alt="Cover" className="service-cover-image" />
                </td>
                <td>{new Date(service.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(service)} className="edit-btn">✏️ Edit</button>
                  <button onClick={() => handleDelete(service._id)} className="delete-btn">❌ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add/Edit Service Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editServiceId ? "Edit Service" : "Add Service"}</h2>
            <form onSubmit={handleAddOrEditService}>
              <input type="text" placeholder="Enter Service Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="form-input" />
              <textarea placeholder="Enter Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required className="form-textarea" />
              <textarea placeholder="Enter SEO Meta" value={formData.seometa} onChange={(e) => setFormData({ ...formData, seometa: e.target.value })} required className="form-textarea" />
              <input type="file" onChange={handleThumbnailChange} className="form-file" />
              
              <input type="file" onChange={handleCoverImageChange} className="form-file" />
              <button type="submit" className="submit-btn">{editServiceId ? "✅ Update Service" : "✅ Save Service"}</button>
              <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">❌ Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicePage;