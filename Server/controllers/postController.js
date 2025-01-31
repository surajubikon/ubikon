import Postmodels from "../models/Postmodels.js";
import mongoose from "mongoose";
import cloudinary from "../utils/cloudinary.js"; // Ensure this path is correct

// Function to upload image to Cloudinary
const uploadToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      } 
    });
    uploadStream.end(buffer);
  });
};

// Create Post Route
export const createPost = async (req, res) => {
  try {
    const { title, slug, description, category, tags, seoMetaDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Convert category to a valid ObjectId
    const validCategory = mongoose.Types.ObjectId(category);

    // Upload image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    console.log("Cloudinary Upload Result:", result);

    // Save post to database with Cloudinary image URL
    const postAdd = new Postmodels({
      title,
      slug,
      description,
      category: validCategory,
      tags,
      seoMetaDescription,
      image: result.secure_url, // Store Cloudinary URL
    });

    const savedPost = await postAdd.save();
    res.status(201).json(savedPost);

  } catch (err) {
    console.error("Error creating post:", err);  // Debugging to see the actual error
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Postmodels.find().populate("category", "name slug");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single post by slug
export const getPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await Postmodels.findOne({ slug }).populate("category", "name slug");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post by ID
export const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, slug, description, category, tags, seoMetaDescription } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updatedData = {
      title,
      slug,
      description,
      category,
      tags,
      seoMetaDescription,
    };
    if (image) updatedData.image = image;

    const updatedPost = await Postmodels.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Postmodels.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
