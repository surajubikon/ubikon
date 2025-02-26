import Testimonial from "../models/testimonialSchema.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import sharp from "sharp";

export const createTestimonial = async (req, res) => {
    const { heading, name, paragraph, video } = req.body;
  
    try {
      if (!heading || !name || !paragraph) {
        return res.status(400).json({ success: false, message: "Heading, name, and paragraph are required." });
      }
  
      // Generate slug from the heading
      const slug = heading
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
  
      const testimonialExists = await Testimonial.findOne({ slug });
      if (testimonialExists) {
        return res.status(400).json({ success: false, message: "Testimonial with this slug already exists." });
      }
  
      // Handle image upload
      let imageUrl = "";
      if (req.file) {
        const imageBuffer = await sharp(req.file.buffer)
          .resize(800, 600)
          .webp({ quality: 80 })
          .toBuffer();
  
        const imageUpload = await uploadToCloudinary(imageBuffer);
        imageUrl = imageUpload.secure_url;
      }
  
      // Create testimonial
      const testimonial = await Testimonial.create({
        heading,
        name,
        paragraph,
        image: imageUrl,
        video,
        slug,
      });
  
      res.status(201).json({
        success: true,
        message: "Testimonial created successfully",
        testimonial,
      });
    } catch (error) {
      console.error("Error in createTestimonial:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// Get all testimonials
export const getTestimonial = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get testimonial by ID
export const getTestimonialById = async (req, res) => {
  const { id } = req.params;

  try {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get testimonial by slug
export const getTestimonialBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const testimonial = await Testimonial.findOne({ slug });
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching the testimonial" });
  }
};

export const updateTestimonial = async (req, res) => {
    const { id } = req.params;
    const { heading, name, paragraph, video } = req.body;
  
    try {
      let updatedFields = { ...req.body };
  
      // If heading is changed, update slug
      if (heading) {
        const slug = heading
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
  
        updatedFields.slug = slug;
      }
  
      // Handle image upload
      if (req.file) {
        const imageBuffer = await sharp(req.file.buffer)
          .resize(800, 600)
          .webp({ quality: 80 })
          .toBuffer();
  
        const imageUpload = await uploadToCloudinary(imageBuffer);
        updatedFields.image = imageUpload.secure_url;
      }
  
      const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updatedFields, { new: true });
  
      if (!updatedTestimonial) {
        return res.status(404).json({ success: false, message: "Testimonial not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Testimonial updated successfully",
        testimonial: updatedTestimonial,
      });
    } catch (error) {
      console.error("Error in updateTestimonial:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// Delete testimonial
export const deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
