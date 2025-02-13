import serviceSchema from "../models/serviceSchema.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const createService = async (req, res) => {
  const { title, ckeditor, description, seometa, publishedAt } = req.body;

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

    const serviceExists = await serviceSchema.findOne({ slug });
    if (serviceExists) {
      return res.status(400).json({ message: "Service with this slug already exists" });
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

    // Create the service with image URLs
    const service = await serviceSchema.create({
      title,
      slug,
      ckeditor,
      description,
      seometa,
      publishedAt,
      thumbnail: thumbnailUrl,
      coverImage: coverImageUrl,
    });

    res.status(201).json(service);
  } catch (error) {
    console.error("Error in createService:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all services
export const getService = async (req, res) => {
  try {
    const services = await serviceSchema.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await serviceSchema.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service
export const updateService = async (req, res) => {
  const { id } = req.params;
  const { title, ckeditor, description, seometa, publishedAt } = req.body;
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

    // Update the service
    const updatedService = await serviceSchema.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedService = await serviceSchema.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceBySlug = async (req, res) => {
  const { slug } = req.params; // Get slug from URL params

  try {
    const service = await serviceSchema.findOne({ slug }); // Find service by slug
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching the service" });
  }
};
