import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Table ,Image } from "react-bootstrap";

const Portfolio = () => {
    const [portfolios, setPortfolios] = useState([]); // API se data store karne ke liye
    const [show, setShow] = useState(false); // Modal control
    const [editing, setEditing] = useState(false); // Edit mode check
    const [selectedId, setSelectedId] = useState(null); // Edit ke liye ID
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
        imagePreview: null,
        technologies: "",
        publishedAt: "",
    });

    // ✅ API Call: Portfolio fetch karne ke liye
    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            const response = await axios.get("https://ubikon.in/api/portfolio/get-all");
            setPortfolios(response.data);
        } catch (error) {
            console.error("Error fetching portfolios:", error);
        }
    };

    // ✅ Modal Handlers
    const handleShow = () => {
        setEditing(false);
        setFormData({ title: "", description: "", image: null, technologies: "", publishedAt: "" });
        setShow(true);
    };
    const handleClose = () => setShow(false);

    // ✅ Input change handler
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ File change handler
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // File select ki
        if (file) {
            setFormData({
                ...formData,
                image: file,
                imagePreview: URL.createObjectURL(file), // Preview URL create kiya
            });
        }
    };

    // ✅ Edit Portfolio
    const handleEdit = (portfolio) => {
        setEditing(true);
        setSelectedId(portfolio._id);
        setFormData({
            title: portfolio.title,
            description: portfolio.description,
            technologies: portfolio.technologies.join(", "),
            publishedAt: portfolio.publishedAt.split("T")[0], // Format date for input
            imagePreview: portfolio.image,
        });
        setShow(true);
    };

    // ✅ Delete Portfolio
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this portfolio?")) {
            try {
                await axios.delete(`https://ubikon.in/api/portfolio/delete/${id}`);
                fetchPortfolios(); // Refresh list
            } catch (error) {
                console.error("Error deleting portfolio:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("technologies", formData.technologies);
        formDataToSend.append("publishedAt", formData.publishedAt);
        if (formData.image) formDataToSend.append("image", formData.image);

        try {
            const config = { headers: { "Content-Type": "multipart/form-data" } };

            if (editing) {
                // ✅ Agar editing true hai, to update API call karo
                await axios.put(`https://ubikon.in/api/portfolio/update/${selectedId}`, formDataToSend, config);
            } else {
                // ✅ Agar naya record hai, to create API call karo
                await axios.post("https://ubikon.in/api/portfolio/create", formDataToSend, config);
            }

            fetchPortfolios(); // ✅ List refresh karo
            handleClose();
        } catch (error) {
            console.error("Error saving portfolio:", error.response?.data || error.message);
        }
    };



    return (
        <div className="container mt-4">
            <h2>Portfolio Management</h2>
            <Button variant="primary" onClick={handleShow} className="mb-3">
                Add Portfolio
            </Button>

            {/* ✅ Modal */}
            <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{editing ? "Edit Portfolio" : "Add Portfolio"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
                        </Form.Group>

                        <div>
                            <Form.Group className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" name="image" onChange={handleFileChange} />
                            </Form.Group>

                            {/* Image Preview */}
                            {formData.imagePreview && (
                                <Image
                                    src={formData.imagePreview}
                                    alt="Preview"
                                    thumbnail
                                    style={{ width: "150px", marginTop: "10px" }}
                                />
                            )}
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Technologies (comma separated)</Form.Label>
                            <Form.Control type="text" name="technologies" value={formData.technologies} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Published At</Form.Label>
                            <Form.Control type="date" name="publishedAt" value={formData.publishedAt} onChange={handleChange} required />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {editing ? "Update Portfolio" : "Save Portfolio"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* ✅ Data Table with Edit & Delete */}
            <Table striped bordered hover>
                <thead className="table-dark">
                    <tr >
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Technologies</th>
                        <th>Published Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(portfolios) && portfolios.length > 0 ? (
                        portfolios.map((portfolio, index) => (
                            <tr key={portfolio._id}>
                                <td>{index + 1}</td>
                                <td>{portfolio.title}</td>
                                <td>{portfolio.description}</td>
                                <td><img src={portfolio.image} alt={portfolio.title} style={{ width: "50px" }} /></td>
                                <td>{portfolio.technologies.join(", ")}</td>
                                <td>{new Date(portfolio.publishedAt).toDateString()}</td>
                                <td>
                                    <Button variant="warning" className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(portfolio)}>
                                        Edit
                                    </Button>
                                    <Button variant="danger" className="btn btn-danger btn-sm" onClick={() => handleDelete(portfolio._id)}>
                                        Delete
                                    </Button>
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No portfolios found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default Portfolio;
