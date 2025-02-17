// add rich text editor

import axios from "axios";
import { useState, useEffect, useRef } from 'react';
import './Blogpage.css'; // Import external CSS file
import BundledEditor from './bundled'; // Import BundledEditor (TinyMCE)

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
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
    content: "" // New state for editor content
    
  });
  const [showModal, setShowModal] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const editorRef = useRef(null);

  // Fetch Blogs
  useEffect(() => {
    axios
      .get("https://ubikon.in/api/blogpost/all")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  // Handle Add or Edit Blog
  const handleAddOrEditBlog = async (e) => {
    e.preventDefault();
    const form = new FormData();

    // Append form fields including files and editor content
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
        // Editing an existing blog
        const res = await axios.put(`https://ubikon.in/api/blogpost/update/${editBlogId}`, form, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setBlogs(blogs.map(blog => (blog._id === editBlogId ? res.data : blog)));
      } else {
        // Adding a new blog
        const res = await axios.post("https://ubikon.in/api/blogpost/create", form, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setBlogs([...blogs, res.data]);
      }
      setShowModal(false);
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
        content: "" // Reset editor content after submission
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
      content: blog.ckeditor || "" // Populate editor content from existing blog data
      
    });
    setShowModal(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ubikon.in/api/blogpost/delete/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Handle file change for thumbnail
  const handleThumbnailChange = (e) => {
    setFormData({ ...formData, thumbnailFile: e.target.files[0] });
  };

  // Handle file change for cover image
  const handleCoverImageChange = (e) => {
    setFormData({ ...formData, coverImageFile: e.target.files[0] });
  };

  // Handle file change for preview image
  const handlePreviewImageChange = (e) => {
    setFormData({ ...formData, previewImageFile: e.target.files[0] });
  };

  return (
    <div className="blogpage-container">
      <button onClick={() => setShowModal(true)} className="add-blog-btn">
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
              <th>content</th>
              <th>Description</th>
              <th>SEO Meta</th>
              <th>Images</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {console.log(blogs)}
            {blogs.map((blog) => (
             
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>{blog.slug}</td>
                <td>{blog.content}</td>
                <td dangerouslySetInnerHTML={{ __html: blog.description }} />
                <td>{blog.seometa}</td>
                <td>
                  <img src={blog.thumbnail} alt="Thumbnail" className="blog-thumbnail" />
                  <img src={blog.coverImage} alt="Cover" className="blog-cover-image" />
                  {blog.previewImage && (
                    <img src={blog.previewImage} alt="Preview" className="blog-preview-image" />
                  )}
                </td>
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

      {/* Add/Edit Blog Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
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

              {/* File Uploads for Thumbnail, Cover Image, Preview Image */}
              <label className="image-label">Upload Thumbnail</label>
              <input type="file" onChange={handleThumbnailChange} className="form-file" />
              {formData.thumbnailFile && (
                <div className="image-preview-container">
                  <img
                    src={URL.createObjectURL(formData.thumbnailFile)}
                    alt="Thumbnail Preview"
                    className="image-preview"
                  />
                </div>
              )}

              <label className="image-label">Upload Cover Image</label>
              <input type="file" onChange={handleCoverImageChange} className="form-file" />
              {formData.coverImageFile && (
                <div className="image-preview-container">
                  <img
                    src={URL.createObjectURL(formData.coverImageFile)}
                    alt="Cover Image Preview"
                    className="image-preview"
                  />
                </div>
              )}

              <label className="image-label">Upload Preview Image</label>
              <input type="file" onChange={handlePreviewImageChange} className="form-file" />
              {formData.previewImageFile && (
                <div className="image-preview-container">
                  <img
                    src={URL.createObjectURL(formData.previewImageFile)}
                    alt="Preview Image Preview"
                    className="preview-image"
                  />
                </div>
              )}

              <br />
              <button type="submit" className="submit-btn">
                {editBlogId ? "✅ Update Blog" : "✅ Save Blog"}
              </button>
              <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">
                ❌ Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPage;
