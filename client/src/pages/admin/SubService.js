import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BundledEditor from './bundled'; // Import BundledEditor (TinyMCE)
import { toast } from "react-toastify";

function SubService() {
  const [subservices, setSubservices] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    content: "",
    coverImage: "",
    seometa: "",
    previewImage: "",
    thumbnailFile: null,
    serviceId: "" // Changed from serviceTitle to serviceId
  });
  const [isFormPage, setIsFormPage] = useState(false);
  const [editSubserviceId, setEditSubserviceId] = useState(null);
  const editorRef = useRef(null);

  // Fetch Subservices
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/sub-services/all")
      .then((res) => setSubservices(res.data))
      .catch((err) => console.error("Error fetching subservices:", err));

    // Fetch Services for Dropdown
    axios
      .get("http://localhost:8000/api/services/all")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Handle Add or Edit Subservice
  const handleAddOrEditSubservice = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("slug", formData.slug);
    form.append("description", formData.description);
    form.append("seometa", formData.seometa);
    form.append("content", formData.content);
    form.append("thumbnail", formData.thumbnailFile);
    form.append("serviceId", formData.serviceId); // Pass serviceId instead of serviceTitle

    try {
      if (editSubserviceId) {
        const res = await axios.put(
          `http://localhost:8000/api/sub-services/update/${editSubserviceId}`,
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
      );
       toast.success("Sub Category updated successfully!");
        setSubservices(
          subservices.map((subservice) =>
            subservice._id === editSubserviceId ? res.data : subservice
          )
        );
      } else {
        const res = await axios.post(
          "http://localhost:8000/api/sub-services/create",
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Sub Category Created successfully!");
        setSubservices([...subservices, res.data]);
      }
      setIsFormPage(false);
      resetForm();
      // alert(editSubserviceId ? "Subservice updated successfully!" : "Subservice added successfully!");
    } catch (error) {
       toast.error("Error uploading data: " + (error.response?.data?.message || "Something went wrong!"));
      
    }
  };

  // Handle Edit
  const handleEdit = (subservice) => {
    setEditSubserviceId(subservice._id);
    setFormData({
      title: subservice.title,
      slug: subservice.slug,
      description: subservice.description,
      seometa: subservice.seometa,
      thumbnail: subservice.thumbnail,
      content: subservice.content,
      serviceId: subservice.serviceId, // Populate serviceId for editing
      thumbnailFile: null,
    });
    setIsFormPage(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/sub-services/delete/${id}`);
      setSubservices(subservices.filter((subservice) => subservice._id !== id));
        toast.success("Sub Category deleted successfully!");
    } catch (error) {
         toast.error("Error deleting data: " + (error.response?.data?.message || "Something went wrong!"));
   
    }
  };

  // Handle file change for thumbnail
  const handleThumbnailChange = (e) => {
    setFormData({ ...formData, thumbnailFile: e.target.files[0] });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      seometa: "",
      thumbnail: "",
      content: "",
      coverImage: "",
      previewImage: "",
      thumbnailFile: null,
      serviceId: "", // Reset serviceId on form reset
    });
    setEditSubserviceId(null);
  };

  return (
    <div className="subservicepage-container">
      {!isFormPage && (
        <>
          <button onClick={() => setIsFormPage(true)} className="add-subservice-btn">
            ➕ Add Subservice
          </button>

          {subservices.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <table className="subservice-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Description</th>
                  {/* <th>Content</th> */}
                  <th>SEO Meta</th>
                  <th>Image</th>
                  <th>Published Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subservices.map((subservice) => (
                  <tr key={subservice._id}>
                    <td>{subservice.title}</td>
                    <td>{subservice.slug}</td>
                    <td>{subservice.description}</td>
                    {/* <td dangerouslySetInnerHTML={{ __html: subservice.content }}></td> */}
                    <td>{subservice.seometa}</td>
                    <td>
                      <img src={subservice.thumbnail} alt={subservice.title} width={50} />
                    </td>
                    <td>{new Date(subservice.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleEdit(subservice)}>Edit</button>
                      <button onClick={() => handleDelete(subservice._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {/* Form Page */}
      {isFormPage && (
        <div className="form-page">
          <h2>{editSubserviceId ? "Edit Subservice" : "Add Subservice"}</h2>
          <form onSubmit={handleAddOrEditSubservice}>
            <input
              type="text"
              placeholder="Enter Subservice Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="form-input"
            />
            <textarea
              placeholder="Enter Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="form-textarea"
            />
            <textarea
              placeholder="Enter SEO Meta"
              value={formData.seometa}
              onChange={(e) => setFormData({ ...formData, seometa: e.target.value })}
              required
              className="form-textarea"
            />

            <select
              value={formData.serviceId}
              onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              required
              className="form-select"
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}> {/* Pass service._id instead of title */}
                  {service.title}
                </option>
              ))}
            </select>

            <label>Content</label>
            <BundledEditor
              onInit={(_evt, editor) => editorRef.current = editor}
              initialValue={formData.content}
              init={{
                height: 0.5 * window.innerHeight,
                width: 0.75 * window.innerWidth,
                menubar: false,
                plugins: [
                  'advlist', 'anchor', 'autolink', 'link', 'lists',
                  'searchreplace', 'table', 'wordcount', 'code', 'directionality', 'media', 'preview', 'image', 'emoticons'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic underline forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'code directionality media table preview image emoticons',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
              onChange={() => {
                if (editorRef.current) {
                  setFormData({ ...formData, content: editorRef.current.getContent() });
                }
              }}
            />

            <input type="file" onChange={handleThumbnailChange} className="form-file" />
            <button type="submit" className="submit-btn">
              {editSubserviceId ? "✅ Update Subservice" : "✅ Save Subservice"}
            </button>
            <button type="button" onClick={() => setIsFormPage(false)} className="cancel-btn">
              ❌ Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SubService;
