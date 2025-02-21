import SubServiceSchema from "../models/subServiceSchema.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import sharp from 'sharp';

export const createSubService = async (req, res) => {
    const { title, content, description, seometa, publishedAt, serviceId } = req.body;
  
    try {
      if (!title || !description || !serviceId) {
        return res.status(400).json({ message: "Title, description, and serviceId are required." });
      }
  
      // Generate slug from the title
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
  
      const subServiceExists = await SubServiceSchema.findOne({ slug });
      if (subServiceExists) {
        return res.status(400).json({ message: "Sub-service with this slug already exists" });
      }
  
      // Handle image uploads
      let thumbnailUrl = '';
    
      // Thumbnail Image
      if (req.files?.thumbnail) {
        const thumbnailBuffer = await sharp(req.files.thumbnail[0].buffer)
          .resize(800, 600)
          .webp({ quality: 80 })
          .toBuffer();
  
        const thumbnailUpload = await uploadToCloudinary(thumbnailBuffer);
        thumbnailUrl = thumbnailUpload.secure_url;
      }
  
      // Create sub-service with image URLs and serviceId
      const subService = await SubServiceSchema.create({
        title,
        slug,
        content,
        description,
        seometa,
        publishedAt,
        thumbnail: thumbnailUrl,
        serviceId,  // Add the serviceId here
      });
  
      res.status(201).json(subService);
    } catch (error) {
      console.error("Error in createSubService:", error);
      res.status(500).json({ message: error.message });
    }
  };
 
// Get all services
export const getSubService = async (req, res) => {
  try {
    const services = await SubServiceSchema.find()
    .populate('serviceId', 'title slug') // ✅ Ye sahi hai
    .sort({ createdAt: -1 });

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update a service
export const updateSubService = async (req, res) => {
  const { id } = req.params;
  const { title, content, description, seometa, publishedAt,serviceId } = req.body;
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

    // Handle image uploads with Sharp for resizing and compression
    if (req.files?.thumbnail) {
      const thumbnailBuffer = await sharp(req.files.thumbnail[0].buffer)
        .resize(800, 600)
        .webp({ quality: 80 })
        .toBuffer();

      const thumbnailUpload = await uploadToCloudinary(thumbnailBuffer);
      updatedFields.thumbnail = thumbnailUpload.secure_url;
    }

  

    

    // Update the service with the updated fields
    const updatedService = await SubServiceSchema.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);
  } catch (error) {
    console.error("Error in updateService:", error);
    res.status(500).json({ message: error.message });
  }
};


// Delete a service
export const deleteSubService = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedService = await SubServiceSchema.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubServiceBySlug = async (req, res) => {
  
  try {
    const { slug } = req.params; // Correct way to get slug from URL params

    // Use findOne() instead of findById()
    const service = await SubServiceSchema.findOne({ slug });
  
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(service);
     
  } catch (error) {
    console.error("Error fetching the service:", error);
    res.status(500).json({ message: "Error fetching the service" });
  }
};
