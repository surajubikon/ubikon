import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostUpload.css"; // Import the CSS file

function PostUpload() {
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        category: "",
        tags: "",
        seoMetaDescription: "",
        image: null,
    });
    const [editFormData, setEditFormData] = useState({
        id: "",
        title: "",
        slug: "",
        description: "",
        category: "",
        tags: "",
        seoMetaDescription: "",
        image: null,
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5); // You can change this value
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch posts on component mount
    useEffect(() => {
        fetchPosts();
    }, [currentPage]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/categories/all");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/posts/create", {
                params: {
                    page: currentPage,
                    limit: postsPerPage,
                },
            });
            setPosts(response.data);
        } catch (error) {
            setError("Failed to fetch posts.");
            console.error("Error fetching posts:", error);
        }
    };

    // Handle text input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle edit text input changes
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
        }
    };

    // Handle edit image upload
    const handleEditFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditFormData((prev) => ({ ...prev, image: file }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            const response = await axios.post("http://localhost:8000/api/posts/create", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setPosts((prev) => [...prev, response.data]);
            setShowModal(false);
            setFormData({
                title: "",
                slug: "",
                description: "",
                category: "",
                tags: "",
                seoMetaDescription: "",
                image: null,
            });
        } catch (error) {
            setError("Failed to create post. Please try again.");
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle edit form submission
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formDataToSend = new FormData();
            for (const key in editFormData) {
                formDataToSend.append(key, editFormData[key]);
            }

            await axios.put(`http://localhost:8000/api/posts/update/${editFormData.id}`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            fetchPosts();
            setEditModal(false);
        } catch (error) {
            setError("Failed to update post. Please try again.");
            console.error("Error updating form:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle delete post
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/posts/delete/${id}`);
            fetchPosts(); // Refresh the posts list
        } catch (error) {
            setError("Failed to delete post. Please try again.");
            console.error("Error deleting post:", error);
        }
    };

    // Open edit modal and fetch post data
    const openEditModal = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/posts/create/${id}`);
            setEditFormData(response.data);
            setEditModal(true);
        } catch (error) {
            setError("Failed to fetch post data.");
            console.error("Error fetching post data:", error);
        }
    };

    // Filter posts based on search term
    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Get pagination buttons
    const renderPagination = () => {
        const pageCount = Math.ceil(posts.length / postsPerPage);
        const pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`pagination-btn ${currentPage === i ? "active" : ""}`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div>
            <button className="add-post-btn" onClick={() => setShowModal(true)}>
                Add Post
            </button>

            {/* Add Post Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Create a New Post</h3>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div>
                                <label>Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Slug</label>
                                <input type="text" name="slug" value={formData.slug} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} required />
                            </div>
                            <div>
                            <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    required
    style={{ color: "black", backgroundColor: "white" }}
>
    <option value="" style={{ color: "black", backgroundColor: "white" }}>
        Select Category
    </option>
    {categories.length > 0 ? (
        categories.map((cat) => (
            <option key={cat._id} value={cat._id} style={{ color: "black", backgroundColor: "white" }}>
                {cat.name}
            </option>
        ))
    ) : (
        <option disabled style={{ color: "black", backgroundColor: "white" }}>
            Loading...
        </option>
    )}
</select>

                            </div>

                            <div>
                                <label>Tags</label>
                                <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
                            </div>
                            <div>
                                <label>SEO Meta Description</label>
                                <input type="text" name="seoMetaDescription" value={formData.seoMetaDescription} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Image</label>
                                <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                            </div>
                            <button type="submit" disabled={loading}>
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                        <button onClick={() => setShowModal(false)} className="close-btn">X</button>
                    </div>
                </div>
            )}

            {/* Edit Post Modal */}
            {editModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Edit Post</h3>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleEditSubmit} encType="multipart/form-data">
                            <div>
                                <label>Title</label>
                                <input type="text" name="title" value={editFormData.title} onChange={handleEditChange} required />
                            </div>
                            <div>
                                <label>Slug</label>
                                <input type="text" name="slug" value={editFormData.slug} onChange={handleEditChange} required />
                            </div>
                            <div>
                                <label>Description</label>
                                <textarea name="description" value={editFormData.description} onChange={handleEditChange} required />
                            </div>
                            <div>
                                <label>Category</label>
                                <select name="category" value={editFormData.category} onChange={handleEditChange} required>
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>Tags</label>
                                <input type="text" name="tags" value={editFormData.tags} onChange={handleEditChange} />
                            </div>
                            <div>
                                <label>SEO Meta Description</label>
                                <input type="text" name="seoMetaDescription" value={editFormData.seoMetaDescription} onChange={handleEditChange} />
                            </div>
                            <div>
                                <label>Image</label>
                                <input type="file" name="image" accept="image/*" onChange={handleEditFileChange} />
                            </div>
                            <button type="submit" disabled={loading}>
                                {loading ? "Updating..." : "Update"}
                            </button>
                        </form>
                        <button onClick={() => setEditModal(false)} className="close-btn">X</button>
                    </div>
                </div>
            )}

            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Display Posts in Table Format */}
            <div className="posts-table">
                <h3>All Posts</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Tags</th>
                            <th>SEO Meta Description</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.map((post) => (
                            <tr key={post._id}>
                                <td>{post.title}</td>
                                <td>{post.description}</td>
                                <td>{categories.find(cat => cat._id === post.category)?.name || "Unknown"}</td>


                                <td>{Array.isArray(post.tags) ? post.tags.join(", ") : post.tags?.name || post.tags}</td>
                                <td>{post.seoMetaDescription}</td>
                                <td>{post.image && <img src={post.image} alt={post.title} className="post-image" />}</td>
                                <td>
                                    <button onClick={() => openEditModal(post._id)} className="edit-btn">Edit</button>
                                    <button onClick={() => handleDelete(post._id)} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
                {renderPagination()}
            </div>
        </div>
    );
}

export default PostUpload;

