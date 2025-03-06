import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./Project.css"; // Add a CSS file for full-screen modal styling
import api, { baseURL } from '../../../API/api.url'
import { Editor } from "@tinymce/tinymce-react";
import BundledEditor from "../../admin/bundled";
function Project() {
    const [show, setShow] = useState(false);
    const [projects, setProjects] = useState([]);
    const editorRef = useRef(null);
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        description: "",
        videoLink: "",
        images: [],
        logo: null,
        content: "",
    });
    const [editId, setEditId] = useState(null);
    const ProjectsList = [
        "Web Development",
        "Mobile App Development",
        "Artificial Intelligence & Machine Learning",
        "SEO (Search Engine Optimization)",
        "Social Media Marketing",
        "Blockchain Development",
        "UI/UX",
        "Game Development",
        "IoT (Internet of Things) Solutions",
    ];
    // 🟢 Fetch Projects
    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(api.projectAPI.projectGet.url);
            if (response.data.success && Array.isArray(response.data.projects)) {
                setProjects(response.data.projects);
            } else {
                toast.error("Invalid data format!");
            }
        } catch (error) {
            toast.error("Failed to fetch projects!");
        }
    };

    const handleEditorChange = () => {
        if (editorRef.current) {
            setFormData({ ...formData, content: editorRef.current.getContent() });
        }
    };

    // 🟢 Handle Form Change
    const handleChange = (e) => {
        if (e.target.name === "images") {
            setFormData({ ...formData, images: [...e.target.files] });
        } else if (e.target.name === "logo") {
            setFormData({ ...formData, logo: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("title", formData.title);
        form.append("heading", formData.heading);
        form.append("description", formData.description);
        form.append("subject", formData.subject);
        form.append("content", formData.content);
        form.append("videoLink", formData.videoLink);
        form.append("projectLink", formData.projectLink);

        // 🟢 Ensure images array exists before using forEach
        if (Array.isArray(formData.images)) {
            formData.images.forEach((img) => form.append("images", img));
        }

        form.append("logo", formData.logo);

        try {
            if (editId) {
                await axios.put(api.projectAPI.projectUpdate.url(editId), form);
                toast.success("Project Updated Successfully!");
            } else {
                await axios.post(api.projectAPI.projectCreate.url, form);
                toast.success("Project Added Successfully!");
            }
            fetchProjects();
            setShow(false);
            resetForm();
        } catch (error) {
            console.error("Submission Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to submit project!");
        }
    };


    const handleEdit = (project) => {
        setEditId(project._id);
        setFormData({
            title: project.title,
            heading: project.heading,
            description: project.description,
            subject: project.subject,
            videoLink: project.videoLink,
            projectLink: project.projectLink,
            images: project.images?.map((img) => `${baseURL}${img}`) || [], // 🟢 BaseURL ke saath set kiya
            logo: project.logo ? `${baseURL}${project.logo}` : null, // 🟢 Logo ke liye bhi baseURL set kiya
            content: project.content,
        });

        if (editorRef.current) {
            editorRef.current.setContent(project.content || "");
        }

        setShow(true);
    };


    // 🟢 Delete Project
    const handleDelete = async (id) => {
        try {
            await axios.delete(api.projectAPI.projectDelete.url(id));
            toast.success("Project Deleted Successfully!");
            fetchProjects(); // List ko update karne ke liye
        } catch (error) {
            console.error("Delete Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to delete project!");
        }
    };


    // 🟢 Reset Form
    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            videoLink: "",
            images: [],
            logo: null,
        });
        setEditId(null);
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <Button variant="primary" onClick={() => setShow(true)} className="mb-3">
                + Add Project
            </Button>

            {/* 🟢 Table for Displaying Projects */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Logo</th>
                        <th>Subject</th>
                        <th>Project link</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects?.map((project, index) => (
                        <tr key={project?._id}>
                            <td>{index + 1}</td>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td>
                                {Array.isArray(project.images) ? (
                                    project.images.map((img, i) => (
                                        <img
                                            key={i}
                                            src={`${baseURL}${img}`}
                                            alt={`Project Image ${i}`}
                                            style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "5px" }}
                                        />
                                    ))
                                ) : (
                                    <img
                                        src={`${baseURL}${project.images}`}
                                        alt="Project Image"
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                    />
                                )}
                            </td>

                            <td>
                                <img
                                    src={`${baseURL}${project.logo}`}
                                    alt="Project Logo"
                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                />
                            </td>
                            <th>{project.subject}</th>
                            <td>
                                <a href={project.videoLink} target="_blank" rel="noopener noreferrer">
                                    View link
                                </a>
                            </td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleEdit(project)}>
                                    Edit
                                </Button>{" "}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(project._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* 🟢 Full-Screen Form */}
            {show && (
                <div className="fullscreen-form">
                    <div className="form-container">
                        <button className="close-btn" onClick={() => setShow(false)}>✖</button>
                        <h2>{editId ? "Edit Project" : "Add Project"}</h2>
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Subject</Form.Label>
                                <select name="subject" value={formData.subject} onChange={handleChange} required>
                                    <option value="">Select Subject</option>
                                    {ProjectsList.map((subject, index) => (
                                        <option key={index} value={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Heading </Form.Label>
                                <Form.Control type="text" name="heading" value={formData.heading} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Video Link</Form.Label>
                                <Form.Control type="text" name="videoLink" value={formData.videoLink} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>project Link</Form.Label>
                                <Form.Control type="text" name="projectLink" value={formData.projectLink} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Project Images</Form.Label>
                                <Form.Control type="file" name="images" multiple onChange={handleChange} />

                                {/* 🟢 Agar images hain to unka preview dikhaye */}
                                <div className="image-preview">
                                    {formData.images?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Preview ${index}`}
                                            style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "5px" }}
                                        />
                                    ))}
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Project Logo</Form.Label>
                                <Form.Control type="file" name="logo" onChange={handleChange} />

                                {/* 🟢 Logo Preview */}
                                {formData.logo && (
                                    <div className="image-preview">
                                        <img
                                            src={formData.logo}
                                            alt="Logo Preview"
                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        />
                                    </div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Content</Form.Label>
                                <div className="mt-4">
                                    <label>Project Details</label>
                                    <BundledEditor
                                        id="projectDetails"
                                        value={formData.content}  // 🟢 Set editor value
                                        onEditorChange={(newContent) => setFormData({ ...formData, content: newContent })}  // 🟢 Update content on change
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: ["advlist", "autolink", "link", "lists", "preview", "image", "media"],
                                            toolbar: "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | image media preview",
                                        }}
                                    />

                                </div>

                            </Form.Group>




                            <Button variant="primary" type="submit">
                                {editId ? "Update Project" : "Submit Project"}
                            </Button>
                        </Form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Project;
