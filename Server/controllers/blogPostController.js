import Blogposts from "../models/blogPost.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
export const createBlogPost = async (req, res) => {
  const { title, ckeditor, description, publishedAt } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    // Generate slug from the title
    const slug = title
      .toLowerCase() // Convert title to lowercase
      .trim() // Remove any extra spaces at the beginning or end
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen

    const postExists = await Blogposts.findOne({ slug });
    if (postExists) {
      return res.status(400).json({ message: "Post with this slug already exists" });
    }

    // Handle image uploads
    let thumbnailUrl = '';
    let coverImageUrl = '';

    if (req.files?.thumbnail) {
      const thumbnailUpload = await uploadToCloudinary(req.files.thumbnail[0].buffer);
      thumbnailUrl = thumbnailUpload.secure_url;
    }

    if (req.files?.coverImage) {
      const coverImageUpload = await uploadToCloudinary(req.files.coverImage[0].buffer);
      coverImageUrl = coverImageUpload.secure_url;
    }

    // Create the blog post with image URLs
    const blogPost = await Blogposts.create({
      title,
      slug,
      ckeditor,
      description,
      publishedAt,
      thumbnail: thumbnailUrl,
      coverImage: coverImageUrl,
    });

    res.status(201).json(blogPost);
  } catch (error) {
    console.error("Error in createBlogPost:", error);
    res.status(500).json({ message: error.message });
  }
};


// Get all blog posts
export const getBlogPosts = async (req, res) => {
  try {
    const blogPosts = await Blogposts.find().sort({ createdAt: -1 });
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogPostById = async (req, res) => {
  const { id } = req.params;
 
  try {
    const blogPost = await Blogposts.find({ slug: id });
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
  const { title, ckeditor, description, publishedAt } = req.body;
  const updates = req.body;

  try {
    let updatedFields = { ...updates };

    // If title is provided and changed, generate a slug
    if (title) {
      const slug = title
        .toLowerCase() // Convert title to lowercase
        .trim() // Remove any extra spaces at the beginning or end
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen

      updatedFields.slug = slug;
    }

    // Handle image uploads if provided
    if (req.files?.thumbnail) {
      const thumbnailUpload = await uploadToCloudinary(req.files.thumbnail[0].buffer);
      updatedFields.thumbnail = thumbnailUpload.secure_url;
    }

    if (req.files?.coverImage) {
      const coverImageUpload = await uploadToCloudinary(req.files.coverImage[0].buffer);
      updatedFields.coverImage = coverImageUpload.secure_url;
    }

    // Update the blog post
    const updatedPost = await Blogposts.findByIdAndUpdate(id, updatedFields, { new: true });

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
    const deletedPost = await Blogposts.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getBlogPostBySlug = async (req, res) => {
  const { slug } = req.params; // Get slug from URL params

  try {
    const blogPost = await Blogposts.findOne({ slug }); // Find blog post by slug
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching the blog post" });
  }
};