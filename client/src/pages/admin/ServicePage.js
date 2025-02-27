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
      .get("https://ubikon.in/api/services/all")
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
        thumbnailPreview: null,
        coverImageFile: null,
        thumbnailPreview: service.thumbnail,  // ✅ Set existing image URL as preview
        coverImagePreview: service.coverImage,  // ✅ Set existing image URL as preview
        previewImagePreview: service.previewImage,  // ✅ Set existing image URL as preview
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

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFormData({
            ...formData,
            thumbnailFile: file,
            thumbnailPreview: URL.createObjectURL(file), // ✅ Preview URL
        });
    }
};

// ✅ Handle file change for Cover Image
const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFormData({
            ...formData,
            coverImageFile: file,
            coverImagePreview: URL.createObjectURL(file), // ✅ Preview URL
        });
    }
};

// ✅ Handle file change for Preview Image
const handlePreviewImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFormData({
            ...formData,
            previewImageFile: file,
            previewImagePreview: URL.createObjectURL(file), // ✅ Preview URL
        });
    }
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
  <div className="modal-overlay d-flex justify-content-center align-items-center">
    <div className="modal-content p-4 bg-white rounded shadow-lg position-relative" style={{ width: "500px" }}>
      
      {/* Close Button at Top Right */}
      <button 
        type="button" 
        className="btn-close position-absolute top-0 end-0 m-3" 
        onClick={() => setShowModal(false)}
        aria-label="Close"
      ></button>
      
      <h2 className="text-center mb-4">{editServiceId ? "Edit Service" : "Add Service"}</h2>
      
      <form onSubmit={handleAddOrEditService} className="needs-validation">
        <div className="mb-3">
          <input type="text" placeholder="Enter Service Title" value={formData.title} 
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required className="form-control" />
        </div>
        
        <div className="mb-3">
          <textarea placeholder="Enter Description" value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required className="form-control"></textarea>
        </div>
        
        <div className="mb-3">
          <textarea placeholder="Enter SEO Meta" value={formData.seometa} 
            onChange={(e) => setFormData({ ...formData, seometa: e.target.value })}
            required className="form-control"></textarea>
        </div>

        {/* Dynamic Fields */}
        <h6>Add More</h6>
        {dynamicFields.map((field, index) => (
          <div key={index} className="mb-3 d-flex gap-2">
            <input type="text" placeholder="Heading" value={field.heading}
              onChange={(e) => handleDynamicFieldChange(index, "heading", e.target.value)}
              className="form-control" />
            <input type="text" placeholder="Value" value={field.value}
              onChange={(e) => handleDynamicFieldChange(index, "value", e.target.value)}
              className="form-control" />
            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeDynamicField(index)}>❌</button>
          </div>
        ))}
        <button type="button" className="btn btn-primary btn-sm mb-3" onClick={addDynamicField}>➕ Add More</button>

        {/* File Inputs with Previews */}
        <div className="mb-3">
          <label className="form-label">Thumbnail:</label>
          <input type="file" onChange={handleThumbnailChange} className="form-control" />
          {formData.thumbnailPreview && <img src={formData.thumbnailPreview} alt="Thumbnail Preview" className="img-thumbnail mt-2" style={{ width: "150px" }} />}
        </div>

        <div className="mb-3">
          <label className="form-label">Cover Image:</label>
          <input type="file" onChange={handleCoverImageChange} className="form-control" />
          {formData.coverImagePreview && <img src={formData.coverImagePreview} alt="Cover Preview" className="img-thumbnail mt-2" style={{ width: "150px" }} />}
        </div>

        <div className="mb-3">
          <label className="form-label">Preview Image:</label>
          <input type="file" onChange={handlePreviewImageChange} className="form-control" />
          {formData.previewImagePreview && <img src={formData.previewImagePreview} alt="Preview Image" className="img-thumbnail mt-2" style={{ width: "150px" }} />}
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">{editServiceId ? "✅ Update Service" : "✅ Save Service"}</button>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
  );
}

export default ServicePage;
