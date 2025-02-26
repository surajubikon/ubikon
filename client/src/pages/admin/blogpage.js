import axios from "axios";
import { useState, useEffect, useRef } from 'react';
import './Blogpage.css'; // Import external CSS file
import BundledEditor from './bundled'; // Import BundledEditor (TinyMCE)

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false); // New state to toggle form visibility
  const [editBlogId, setEditBlogId] = useState(null);
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    coverImage: "",
    seometa: "",
    previewImage: "",
    thumbnailFile: null,
    coverImageFile: null,
    previewImageFile: null,
    content: "" // Editor content
  });

  // Fetch Blogs
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/blogpost/all")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  // Handle Add or Edit Blog
  const handleAddOrEditBlog = async (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append("title", formData.title);
    form.append("slug", formData.slug);
    form.append("description", formData.description);
    form.append("seometa", formData.seometa);
    form.append("content", formData.content);
    form.append("thumbnail", formData.thumbnailFile);
    form.append("coverImage", formData.coverImageFile);
    form.append("previewImage", formData.previewImageFile);

    try {
      if (editBlogId) {
        const res = await axios.put(`http://localhost:8000/api/blogpost/update/${editBlogId}`, form, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setBlogs(blogs.map(blog => (blog._id === editBlogId ? res.data : blog)));
      } else {
        const res = await axios.post("http://localhost:8000/api/blogpost/create", form, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setBlogs([...blogs, res.data]);
      }

      setShowForm(false);
      setFormData({
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
        content: ""
      });
      setEditBlogId(null);
      alert(editBlogId ? "Blog updated successfully!" : "Blog added successfully!");
    } catch (error) {
      console.error("Error saving blog:", error.response?.data || error);
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
      content: blog.content || ""
    });
    setShowForm(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/blogpost/delete/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Handle file changes
  const handleFileChange = (e, type, previewType) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        [type]: file,
        [previewType]: URL.createObjectURL(file) // Create preview URL
      });
    }
  };

  if (showForm) {
    return (
      <div className="blogpage-container">
        <button onClick={() => setShowForm(false)} className="back-btn">⬅️ Back to Blogs</button>
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

          <label>Content</label>
          <BundledEditor
            onInit={(_evt, editor) => editorRef.current = editor}
            initialValue={formData.content}
            init={{
              height: 400,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'link', 'lists', 'searchreplace',
                'table', 'wordcount', 'code', 'directionality', 'media', 'preview', 'image', 'emoticons'
              ],
              toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | media preview image emoticons',
            }}
            onChange={() => {
              if (editorRef.current) {
                setFormData({ ...formData, content: editorRef.current.getContent() });
              }
            }}
          />

          {/* File Uploads */}
          <label>Upload Thumbnail</label>
          {formData.thumbnail && <img src={formData.thumbnail} alt="Thumbnail Preview" className="preview-image"  style={{ width: "50px", height: "50px" }} />}
          <input type="file" onChange={(e) => handleFileChange(e, "thumbnailFile", "thumbnail")} className="form-file" />
          
          <label>Upload Cover Image</label>
          {formData.coverImage && <img src={formData.coverImage} alt="Cover Preview" className="preview-image"  style={{ width: "50px", height: "50px" }}/>}
          <input type="file" onChange={(e) => handleFileChange(e, "coverImageFile", "coverImage")} className="form-file" />
          
          <label>Upload Preview Image</label>
          {formData.previewImage && <img src={formData.previewImage} alt="Preview Image" className="preview-image"  style={{ width: "50px", height: "50px" }}/>}
          <input type="file" onChange={(e) => handleFileChange(e, "previewImageFile", "previewImage")} className="form-file" />
          
          <button type="submit" className="submit-btn">
            {editBlogId ? "✅ Update Blog" : "✅ Save Blog"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="blogpage-container">
      <button onClick={() => setShowForm(true)} className="add-blog-btn">➕ Add Blog</button>

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
                <td><img src={blog.thumbnail} alt="Thumbnail" className="blog-thumbnail" /></td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(blog)} className="edit-btn">✏️ Edit</button>
                  <button onClick={() => handleDelete(blog._id)} className="delete-btn">❌ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BlogPage;
