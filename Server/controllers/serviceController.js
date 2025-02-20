
import serviceSchema from "../models/serviceSchema.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import sharp from 'sharp';

export const createService = async (req, res) => {
  const { title, ckeditor, description, seometa, publishedAt , dynamicFields } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    // Generate slug from the title
    const slug = title
      .toLowerCase()
      .trim()
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
    let previewImageUrl = ''; // For the preview image

    // Thumbnail Image
    if (req.files?.thumbnail) {
      const thumbnailBuffer = await sharp(req.files.thumbnail[0].buffer)
        .resize(800, 600)
        .webp({ quality: 80 })
        .toBuffer();

      const thumbnailUpload = await uploadToCloudinary(thumbnailBuffer);
      thumbnailUrl = thumbnailUpload.secure_url;
    }

    // Cover Image
    if (req.files?.coverImage) {
      const coverImageBuffer = await sharp(req.files.coverImage[0].buffer)
        .resize(1200, 800)
        .webp({ quality: 80 })
        .toBuffer();

      const coverImageUpload = await uploadToCloudinary(coverImageBuffer);
      coverImageUrl = coverImageUpload.secure_url;
    }

    // Preview Image
    if (req.files?.previewImage) {
      const previewImageBuffer = await sharp(req.files.previewImage[0].buffer)
        .resize(400, 300)  // Adjust size as per your requirement
        .webp({ quality: 80 })
        .toBuffer();

      const previewImageUpload = await uploadToCloudinary(previewImageBuffer);
      previewImageUrl = previewImageUpload.secure_url;
    }
  // Convert dynamicFields to array (if it's not already)
  let parsedDynamicFields = [];
  if (dynamicFields) {
    parsedDynamicFields = JSON.parse(dynamicFields); // Frontend se string aaye to JSON parse karega
  }
    // Create service with image URLs
    const service = await serviceSchema.create({
      title,
      slug,
      ckeditor,
      description,
      seometa,
      publishedAt,
      thumbnail: thumbnailUrl,
      coverImage: coverImageUrl,
      previewImage: previewImageUrl, // Add preview image URL
      dynamicFields: parsedDynamicFields, // Store dynamic fields in DB
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
  const { title, ckeditor, description, seometa, publishedAt, dynamicFields  } = req.body;
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

    if (req.files?.coverImage) {
      const coverImageBuffer = await sharp(req.files.coverImage[0].buffer)
        .resize(1200, 800)
        .webp({ quality: 80 })
        .toBuffer();

      const coverImageUpload = await uploadToCloudinary(coverImageBuffer);
      updatedFields.coverImage = coverImageUpload.secure_url;
    }

    // Handle Preview Image upload if it exists
    if (req.files?.previewImage) {
      const previewImageBuffer = await sharp(req.files.previewImage[0].buffer)
        .resize(400, 300) // Resize according to your requirement
        .webp({ quality: 80 })
        .toBuffer();

      const previewImageUpload = await uploadToCloudinary(previewImageBuffer);
      updatedFields.previewImage = previewImageUpload.secure_url;
    }
    // Handle dynamic fields (parse JSON string if coming from FormData)
    if (dynamicFields) {
      updatedFields.dynamicFields = typeof dynamicFields === "string" ? JSON.parse(dynamicFields) : dynamicFields;
    }
    // Update the service with the updated fields
    const updatedService = await serviceSchema.findByIdAndUpdate(id, updatedFields, { new: true });

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
