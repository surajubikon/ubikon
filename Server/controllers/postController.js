import Postmodels from "../models/Postmodels.js";
import mongoose from "mongoose";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const createPost = async (req, res) => {
  try {


    const { title, slug, description, category, tags, seoMetaDescription } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Convert category to a valid ObjectId
    const validCategory = new mongoose.Types.ObjectId(category);

    // Upload image to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    console.log("Cloudinary Upload Result:", result);

    // Save post to database with Cloudinary image URL
    const postAdd = new Postmodels({
      title,
      slug,
      description,
      category: validCategory,
      tags: Array.isArray(tags) ? tags : tags.split(","),
      seoMetaDescription,
      image: result.secure_url, // Store Cloudinary URL
    });

    const savedPost = await postAdd.save();
    res.status(201).json(savedPost);

  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    console.log("Attempting to update post with id:", id); // Log the id to check its value

    const { title, slug, description, category, tags, seoMetaDescription } = req.body;
    let image;

    // // If a new image is uploaded, upload it to Cloudinary
    // if (req.file) {
    //   const result = await uploadToCloudinary(req.file.buffer);
    //   image = result.secure_url; // Cloudinary image URL
    // }

    // Prepare updated data
    const updatedData = {
      title,
      slug,
      description,
      category: mongoose.Types.ObjectId(category), // Ensure category is a valid ObjectId
      tags: Array.isArray(tags) ? tags : tags.split(","),
      seoMetaDescription,
    };

    if (image) {
      updatedData.image = image; // Only add image if it's uploaded
    }

    // Update the post in the database directly
    const updatedPost = await Postmodels.findByIdAndUpdate(id, updatedData, { new: true });

    // if (!updatedPost) {
    //   return res.status(404).json({ message: "Post not found" });
    // }

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


// Other controller functions...
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
