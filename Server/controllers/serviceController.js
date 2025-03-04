
import serviceSchema from "../models/serviceSchema.js";
import fs from "fs";
import path from "path";


export const createService = async (req, res) => {
  const { title, ckeditor, description, seometa, publishedAt, dynamicFields } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const serviceExists = await serviceSchema.findOne({ slug });
    if (serviceExists) {
      return res.status(400).json({ message: "Service with this slug already exists" });
    }

    // Handle image uploads
    let thumbnailUrl = req.files?.thumbnail ? `/uploads/service/${req.files.thumbnail[0].filename}` : "";
    let coverImageUrl = req.files?.coverImage ? `/uploads/service/${req.files.coverImage[0].filename}` : "";
    let previewImageUrl = req.files?.previewImage ? `/uploads/service/${req.files.previewImage[0].filename}` : "";

    // Convert dynamicFields to array (if needed)
    let parsedDynamicFields = [];
    if (dynamicFields) {
      parsedDynamicFields = JSON.parse(dynamicFields);
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
      previewImage: previewImageUrl,
      dynamicFields: parsedDynamicFields,
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
  const { title, ckeditor, description, seometa, publishedAt, dynamicFields } = req.body;

  try {
    let service = await serviceSchema.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    let updatedFields = { title, ckeditor, description, seometa, publishedAt };

    // Generate new slug if title is updated
    if (title) {
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      updatedFields.slug = slug;
    }

    // Function to delete old image
    const deleteOldImage = (oldImagePath) => {
      if (oldImagePath) {
        const fullPath = path.join("public", oldImagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
    };

    // Handle image uploads
    if (req.files?.thumbnail) {
      deleteOldImage(service.thumbnail); // Delete old thumbnail
      updatedFields.thumbnail = `/uploads/service/${req.files.thumbnail[0].filename}`;
    }

    if (req.files?.coverImage) {
      deleteOldImage(service.coverImage); // Delete old cover image
      updatedFields.coverImage = `/uploads/service/${req.files.coverImage[0].filename}`;
    }

    if (req.files?.previewImage) {
      deleteOldImage(service.previewImage); // Delete old preview image
      updatedFields.previewImage = `/uploads/service/${req.files.previewImage[0].filename}`;
    }

    // Handle dynamic fields
    if (dynamicFields) {
      updatedFields.dynamicFields = typeof dynamicFields === "string" ? JSON.parse(dynamicFields) : dynamicFields;
    }

    // Update service in database
    const updatedService = await serviceSchema.findByIdAndUpdate(id, updatedFields, { new: true });

    res.json(updatedService);
  } catch (error) {
    console.error("Error in updateService:", error);
    res.status(500).json({ message: error.message });
  }
};



export const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await serviceSchema.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Delete images from uploads folder
    const imagePaths = [service.thumbnail, service.coverImage, service.previewImage];

    imagePaths.forEach((imgPath) => {
      if (imgPath) {
        const fullPath = path.join("public", imgPath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
    });

    // Delete service from database
    await serviceSchema.findByIdAndDelete(id);
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
