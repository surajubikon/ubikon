import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS
import "./Blogpage.css"; // External CSS
import BundledEditor from "./bundled"; // TinyMCE Editor
import { baseURL } from "../../API/api.url";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const editorRef = useRef(null);

  const closeToast = (toastObj) => {
    if (toastObj && typeof toastObj === "object") {
      toastObj.removalReason = "User dismissed";
    }
  };
  
  const initialFormState = {
    title: "",
    slug: "",
    description: "",
    seometa: "",
    thumbnail: "",
    coverImage: "",
    previewImage: "",
    thumbnailFile: null,
    coverImageFile: null,
    previewImageFile: null,
    content: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch Blogs
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/blogpost/all")
      .then((res) => setBlogs(res.data))
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        toast.error("Failed to load blogs!");
      });
  }, []);

  // Handle Add or Edit Blog
  const handleAddOrEditBlog = async (e) => {
    e.preventDefault();
    const form = new FormData();
  
    // ✅ Add Text Fields Correctly
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("seometa", formData.seometa);
    form.append("content", formData.content);
  
    // ✅ Add Images Only If Selected
    if (formData.thumbnailFile) form.append("thumbnail", formData.thumbnailFile);
    if (formData.coverImageFile) form.append("coverImage", formData.coverImageFile);
    if (formData.previewImageFile) form.append("previewImage", formData.previewImageFile);
  
    try {
      let res;
      if (editBlogId) {
        res = await axios.put(`http://localhost:8000/api/blogpost/update/${editBlogId}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setBlogs(blogs.map((blog) => (blog._id === editBlogId ? res.data : blog)));
        toast.success("✅ Blog updated successfully!");
      } else {
        res = await axios.post("http://localhost:8000/api/blogpost/create", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setBlogs([...blogs, res.data]);
        toast.success("✅ Blog added successfully!");
      }
  
      resetForm();
    } catch (error) {
      console.error("❌ Error saving blog:", error.response?.data || error);
      toast.error("❌ Failed to save blog!");
    }
  };
  

  // Handle Edit
  const handleEdit = (blog) => {
    setEditBlogId(blog._id);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      description: blog.description,
      seometa: blog.seometa,
      thumbnail: blog.thumbnail,
      coverImage: blog.coverImage,
      previewImage: blog.previewImage,
      thumbnailFile: null,
      coverImageFile: null,
      previewImageFile: null,
      content: blog.content || "",
    });
    setShowForm(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/blogpost/delete/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog!");
    }
  };

  // Handle file changes
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        [type]: file,
        [`${type}Preview`]: URL.createObjectURL(file),
      });
    }
  };

  // Reset form after submission
  const resetForm = () => {
    setFormData(initialFormState);
    setShowForm(false);
    setEditBlogId(null);
  };

  return (
    <div className="blogpage-container">
      <ToastContainer position="top-right" autoClose={3000} /> {/* Toast Notifications */}

      {showForm ? (
        <div>
          <button onClick={resetForm} className="back-btn">
            ⬅️ Back to Blogs
          </button>
          <h2>{editBlogId ? "Edit Blog" : "Add Blog"}</h2>
          <form onSubmit={handleAddOrEditBlog}>
            <input
              type="text"
              placeholder="Enter Blog Title"
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

            {/* TinyMCE Editor */}
            <label>Content</label>
            <BundledEditor
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue={formData.content}
              init={{
                height: 400,
                menubar: false,
                plugins: ["advlist", "autolink", "link", "lists", "preview", "image", "media"],
                toolbar: "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | image media preview",
              }}
              onChange={() => setFormData({ ...formData, content: editorRef.current.getContent() })}
            />

            {/* File Uploads */}
            {["thumbnail", "coverImage", "previewImage"].map((type) => (
              <div key={type}>
                <label>Upload {type}</label>
                {formData[type] && <img src={formData[type]} alt={type} className="preview-image" style={{ width: "50px", height: "50px" }} />}
                <input type="file" onChange={(e) => handleFileChange(e, `${type}File`, type)} className="form-file" />
              </div>
            ))}

            <button type="submit" className="submit-btn">
              {editBlogId ? "✅ Update Blog" : "✅ Save Blog"}
            </button>
          </form>
        </div>
      ) : (
        <>
          <button onClick={() => setShowForm(true)} className="add-blog-btn">
            ➕ Add Blog
          </button>

          {blogs.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <table className="blog-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Description</th>
                  <th>SEO Meta</th>
                  <th>Images</th>
                  <th>Published Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>{blog.title}</td>
                    <td>{blog.slug}</td>
                    <td dangerouslySetInnerHTML={{ __html: blog.description }} />
                    <td>{blog.seometa}</td>
                    <td><img src={`${baseURL}${blog.thumbnail}`} alt="Thumbnail" className="blog-thumbnail" /></td>
                    <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleEdit(blog)} className="edit-btn">✏️</button>
                      <button onClick={() => handleDelete(blog._id)} className="delete-btn">❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default BlogPage;
