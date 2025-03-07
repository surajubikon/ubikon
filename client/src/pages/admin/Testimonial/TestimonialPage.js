import React, { useState, useEffect } from "react";
import { Button, Form, Table, Container } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../../../API/api.url";

function TestimonialPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    heading: "",
    name: "",
    image: null,
    video: null,
    paragraph: "",
    slug: "",
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/testimonials/all");
      setTestimonials(res.data);
    } catch (error) {
      console.error("Error fetching testimonials", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataObj.append(key, formData[key]);
      }
    });
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/testimonials/update/${editingId}`, formDataObj, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Testimonial updated successfully!");

      } else {
        await axios.post("http://localhost:8000/api/testimonials/create-testimonial", formDataObj, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Testimonial added successfully!");

      }
      fetchTestimonials();
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      toast.error("Error uploading data: " + (error.response?.data?.message || "Something went wrong!"));

    }
  };

  const handleEdit = (testimonial) => {
    setFormData({
      heading: testimonial.heading,
      name: testimonial.name,
      image: testimonial.image,
      video: testimonial.video,
      paragraph: testimonial.paragraph,
      slug: testimonial.slug,
    });
    setEditingId(testimonial._id);
    setShowForm(true);
    setPreviewImage(`${baseURL}${testimonial.image}`); // Image preview ke liye
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/testimonials/delete/${id}`);
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial", error);
    }
  };

  return (
    <Container className="mt-4">

      {!showForm ? (
        <>
          <Button variant="primary" onClick={() => setShowForm(true)}>Add Testimonial</Button>
          <Table striped bordered hover className="mt-3">
            <thead className="table-dark">
              <tr>
                <th>Heading</th>
                <th>Name</th>
                <th>Image</th>
                <th>Video</th>
                <th>Paragraph</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((item) => (
                <tr key={item._id}>
                  <td>{item.heading}</td>
                  <td>{item.name}</td>
                  <td><img src={`${baseURL}${item.image}`} alt="" width="50" /></td>
                  <td>{item.video ? <a href={item.video} target="_blank" rel="noopener noreferrer">Video</a> : "N/A"}</td>
                  <td>{item.paragraph}</td>
                  <td>
                    <Button variant="warning" className="me-2" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <div className="d-flex flex-column align-items-center w-100">
          <Button variant="danger" className="align-self-end mb-3" onClick={() => { setShowForm(false); setEditingId(null); }}>✖</Button>
          <Form onSubmit={handleSubmit} className="w-50 border p-4 shadow rounded" encType="multipart/form-data">
            <h3 className="text-center mb-4">{editingId ? "Edit" : "Add"} Testimonial</h3>
            <Form.Group>
              <Form.Label>Heading</Form.Label>
              <Form.Control type="text" name="heading" value={formData.heading} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image Upload</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />

              {/* ✅ Agar edit mode me hai & naye image select nahi kiya, to preview dikhao */}
              {editingId && !formData.image && previewImage && (
                <img src={previewImage} alt="Preview" className="mt-2" width="100" height="100" />
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Video Upload</Form.Label>
              <Form.Control type="text" name="video" value={formData.video} onChange={handleChange} />
              {editingId && formData.video && (
                <div className="mt-2">
                  <a href={formData.video} target="_blank" rel="noopener noreferrer">View Video</a>
                </div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Paragraph</Form.Label>
              <Form.Control as="textarea" name="paragraph" value={formData.paragraph} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Slug</Form.Label>
              <Form.Control type="text" name="slug" value={formData.slug} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 w-100">{editingId ? "Update" : "Submit"}</Button>
          </Form>
        </div>
      )}
    </Container>
  );
}

export default TestimonialPage;