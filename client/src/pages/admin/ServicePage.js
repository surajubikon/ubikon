import React, { useEffect, useState } from "react";
import axios from "axios";
import './ServicePage.css'; // Import external CSS file

function ServicePage() {
  const [services, setServices] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    ckeditor: "",
    coverImage: "",
    seometa: "",
    previewImage: "", // New field for preview image
    thumbnailFile: null,
    coverImageFile: null,
    previewImageFile: null, // New state for preview image file
  });
  const [dynamicFields, setDynamicFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editServiceId, setEditServiceId] = useState(null);

  // Fetch Services
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/services/all")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);
  // Handle Add Dynamic Field
  const addDynamicField = () => {
    setDynamicFields([...dynamicFields, { heading: "", value: "" }]);
  };
  // Handle Change in Dynamic Fields
  const handleDynamicFieldChange = (index, field, value) => {
    const updatedFields = [...dynamicFields];
    updatedFields[index][field] = value;
    setDynamicFields(updatedFields);
  };
  // Handle Remove Dynamic Field
  const removeDynamicField = (index) => {
    setDynamicFields(dynamicFields.filter((_, i) => i !== index));
  };
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
    form.append("previewImage", formData.previewImageFile); // Add preview image to form data
    form.append("dynamicFields", JSON.stringify(dynamicFields));

    try {
      if (editServiceId) {
        // Editing an existing service
        const res = await axios.put(`http://localhost:8000/api/services/update/${editServiceId}`, form, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setServices(services.map(service => (service._id === editServiceId ? res.data : service)));
      } else {
        // Adding a new service
        const res = await axios.post("http://localhost:8000/api/services/create", form, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setServices([...services, res.data]);
      }
      setShowModal(false);
      setFormData({
        title: "",
        slug: "",
        description: "",
        seometa: "",
        thumbnail: "",
        ckeditor: "",
        coverImage: "",
        previewImage: "", // Reset preview image field
        thumbnailFile: null,
        coverImageFile: null,
        previewImageFile: null, // Reset preview image file
      });
      setDynamicFields([]);
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
      previewImage: service.previewImage, // Set preview image URL when editing
      thumbnailFile: null,
      coverImageFile: null,
      previewImageFile: null, // Reset file state on edit
    });
    setShowModal(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/services/delete/${id}`);
      setServices(services.filter(service => service._id !== id));
      alert("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  // Handle file change for thumbnail
  const handleThumbnailChange = (e) => {
    setFormData({ ...formData, thumbnailFile: e.target.files[0]});
  };

  // Handle file change for cover image
  const handleCoverImageChange = (e) => {
    setFormData({ ...formData, coverImageFile: e.target.files[0] });
  };

  // Handle file change for preview image
  const handlePreviewImageChange = (e) => {
    setFormData({ ...formData, previewImageFile: e.target.files[0]});
  };

  return (
    <div className="servicepage-container">
      <button onClick={() => setShowModal(true)} className="add-service-btn">
        ➕ Add Categorya
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
                  {service.previewImage && (
                    <img src={service.previewImage} alt="Preview" className="service-preview-image" />
                  )}
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
              {/* Dynamic Fields */}
              <h6>Add more</h6>
              {dynamicFields.map((field, index) => (
                <div key={index}>
                  <input type="text" placeholder="Heading" value={field.heading} onChange={(e) => handleDynamicFieldChange(index, "heading", e.target.value)} />
                  <input type="text" placeholder="Value" value={field.value} onChange={(e) => handleDynamicFieldChange(index, "value", e.target.value)} />
                  <button type="button" onClick={() => removeDynamicField(index)}>❌ Remove</button>
                </div>
              ))}
              <button type="button" onClick={addDynamicField}>➕Add more</button>
              <br /><br/>
              <label>Thumbnail:</label>
              <input type="file" onChange={handleThumbnailChange} className="form-file" />
              {thumbnail && <p>Selected Thumbnail: {thumbnail}</p>}
              <label>Cover Image:</label>
              <input type="file" onChange={handleCoverImageChange} className="form-file" />
              {coverImage && <p>Selected Cover Image: {coverImage}</p>}
              <label>Preview Image:</label>
              <input type="file" onChange={handlePreviewImageChange} className="form-file" />
              {previewImage && <p>Selected Preview Image: {previewImage}</p>}
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
