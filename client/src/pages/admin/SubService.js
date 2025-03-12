import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BundledEditor from './bundled'; // Import BundledEditor (TinyMCE)
import { toast } from "react-toastify";
import { baseURL } from "../../API/api.url";
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
    serviceId: "",

  });
  const [isFormPage, setIsFormPage] = useState(false);
  const [editSubserviceId, setEditSubserviceId] = useState(null);
  const editorRef = useRef(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [features, setFeatures] = useState([{ title: "", description: "", icon: "" }]);
  const [useCases, setUseCases] = useState([{ title: "", description: "" }]);
  const [whyChooseUs, setWhyChooseUs] = useState([{ title: "", description: "" }]);


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
    form.append("serviceId", formData.serviceId);
    form.append("features", JSON.stringify(features));
    form.append("useCases", JSON.stringify(useCases));
    form.append("whyChooseUs", JSON.stringify(whyChooseUs));
   
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
    setFeatures(subservice.features || []);
    setUseCases(subservice.useCases || []);
    setWhyChooseUs(subservice.whyChooseUs || []);
    setThumbnailPreview(subservice.thumbnail ? `${baseURL}${subservice.thumbnail}` : null);
    setIsFormPage(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/sub-services/delete/${id}`);
      setSubservices(subservices.filter((sub) => sub._id !== id));
      toast.success("Subservice deleted successfully!");
    } catch (error) {
      toast.error("Error deleting data: " + (error.response?.data?.message || "Something went wrong!"));
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, thumbnailFile: file });
    setThumbnailPreview(URL.createObjectURL(file));
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
    setThumbnailPreview(null);
    setFeatures([{ title: "", description: "", icon: "" }]);
    setUseCases([{ title: "", description: "" }]);
    setWhyChooseUs([{ title: "", description: "" }]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value; // Update specific field
    setFeatures(updatedFeatures);
  };


  const addFeature = () => {
    setFeatures([...features, { title: "", description: "", icon: "" }]);
  };

  const removeFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  const handleDynamicChange = (index, field, value, stateSetter, stateData) => {
    const updatedData = [...stateData];
    updatedData[index][field] = value; // Update specific field
    stateSetter(updatedData);
  };
  const addField = (stateSetter, stateData) => {
    stateSetter([...stateData, { title: "", description: "" }]);
  };

  const removeField = (index, stateSetter, stateData) => {
    const updatedData = stateData.filter((_, i) => i !== index);
    stateSetter(updatedData);
  };


  return (
    <div className="subservicepage-container">
      {!isFormPage && (
        <>
          <button onClick={() => setIsFormPage(true)} className="add-subservice-btn"> ➕ Add Subservice </button>

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
                      <img src={`${baseURL}${subservice.thumbnail}`} alt={subservice.title} width={50} />

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
              name="title"
              placeholder="Enter Subservice Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
            />

            <textarea
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-textarea"
            />

            <textarea
              name="seometa"
              placeholder="Enter SEO Meta"
              value={formData.seometa}
              onChange={handleChange}
              required
              className="form-textarea"
            />

            <select
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.title}
                </option>
              ))}
            </select>

            <label>Content</label>
            <BundledEditor
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue={formData.content}
              init={{
                height: 0.5 * window.innerHeight,
                width: 0.75 * window.innerWidth,
                menubar: false,
                plugins: [
                  "advlist",
                  "anchor",
                  "autolink",
                  "link",
                  "lists",
                  "searchreplace",
                  "table",
                  "wordcount",
                  "code",
                  "directionality",
                  "media",
                  "preview",
                  "image",
                  "emoticons",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic underline forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "code directionality media table preview image emoticons",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onChange={() => {
                if (editorRef.current) {
                  setFormData({ ...formData, content: editorRef.current.getContent() });
                }
              }}
            />
            {/* Features Field */}
            <div className="row mt-4">
              <div className="col-md-3">
                <button className="btn btn-primary w-40 mb-6" onClick={addFeature}>
                  Features ➕
                </button>
              </div>

              {/* Features List */}
              <div className="col-md-9">
                {features.map((feature, index) => (
                  <div key={index} className="row p-2 border rounded mb-2">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Feature Title"
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Feature Description"
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Feature Icon (optional)"
                        value={feature.icon}
                        onChange={(e) => handleFeatureChange(index, "icon", e.target.value)}
                      />
                    </div>
                    <div className="col-md-1">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm w-100"
                        onClick={() => removeFeature(index)}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Dynamic Sections: Use Cases, Why Choose Us */}
            <div className="row mt-4">
              {/* Use Cases & Why Choose Us (Handled as Arrays) */}
              {[{ title: "Use Cases", data: useCases, setData: setUseCases },
              { title: "Why Choose Us", data: whyChooseUs, setData: setWhyChooseUs }].map((section, secIndex) => (
                <div key={secIndex} className="col-md-4">
                  <button className="btn btn-primary w-100 mb-3" onClick={() => addField(section.setData, section.data)}>
                    {section.title} ➕
                  </button>
                  {section.data.map((item, index) => (
                    <div key={index} className="p-2 border rounded mb-2">
                      <input
                        type="text"
                        placeholder="Title"
                        value={item.title}
                        onChange={(e) => handleDynamicChange(index, "title", e.target.value, section.setData, section.data)}
                        className="form-control"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleDynamicChange(index, "description", e.target.value, section.setData, section.data)}
                        className="form-control mt-2"
                      />

                      <input
                        type="text"
                        placeholder="icon "
                        value={item.description}
                        onChange={(e) => handleDynamicChange(index, "icon", e.target.value, section.setData, section.data)}
                        className="form-control mt-2"
                      />
                      <button className="btn btn-danger btn-sm w-100 mt-2" type="button" onClick={() => removeField(index, section.setData, section.data)}>❌ Remove</button>
                    </div>
                  ))}
                </div>
              ))}

              {/* ✅  Section (Handled as an Object, not an Array) */}
            
            </div>

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
