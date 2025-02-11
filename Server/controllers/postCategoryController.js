import PostCategory from "../models/PostCategory.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
export const createBlogPost = async (req, res) => {


  const {
    title,
    slug,
    headings,
    description,
    content,
    author,
    tags,
    categories,
    seoTitle,
    seoMetaDescription,
    seoKeywords,
    status,
    publishedAt,
  } = req.body;

  try {
    const postExists = await PostCategory.findOne({ slug });
    if (postExists) {
      return res.status(400).json({ message: "Post with this slug already exists" });
    }

    let thumbnailUrl = "";
    let coverImageUrl = "";

    if (req.files?.thumbnail) {
    
      const thumbnailUpload = await uploadToCloudinary(req.files.thumbnail[0].buffer);
      
      thumbnailUrl = thumbnailUpload.secure_url;
    }

    if (req.files?.coverImage) {
     
      const coverImageUpload = await uploadToCloudinary(req.files.coverImage[0].buffer);
      
      coverImageUrl = coverImageUpload.secure_url;
    }

    const blogPost = await PostCategory.create({
      title,
      slug,
      headings,
      description,
      content,
      author,
      tags,
      categories,
      seoTitle,
      seoMetaDescription,
      seoKeywords,
      thumbnail: thumbnailUrl,
      coverImage: coverImageUrl,
      status,
      publishedAt,
    });

    res.status(201).json(blogPost);
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
};

// Get all blog posts
export const getBlogPosts = async (req, res) => {
  try {
    const blogPosts = await PostCategory.find().sort({ createdAt: -1 });
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single blog post by ID
export const getBlogPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const blogPost = await PostCategory.findById(id);
    if (!blogPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update a blog post
export const updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    let updatedFields = { ...updates };

    if (req.files?.thumbnail) {
      const thumbnailUpload = await uploadToCloudinary(req.files.thumbnail[0].buffer);
      updatedFields.thumbnail = thumbnailUpload.secure_url;
    }

    if (req.files?.coverImage) {
      const coverImageUpload = await uploadToCloudinary(req.files.coverImage[0].buffer);
      updatedFields.coverImage = coverImageUpload.secure_url;
    }

    const updatedPost = await PostCategory.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog post
export const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await PostCategory.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
