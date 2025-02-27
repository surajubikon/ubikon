import JobCollection from "../models/jobCollectionModel.js";
import jobCategory from "../models/jobCategorySchema.js";
import mongoose from "mongoose";
import sharp from "sharp";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// Create a new job
export const createJob = async (req, res) => {
  try {
   
    const { title, category, experience, deadline, description, content, status, dynamicFields } = req.body;

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    // Handle image uploads
    let thumbnailUrl = "";
    let previewImageUrl = "";

    if (req.files?.thumbnail) {
      const thumbnailBuffer = await sharp(req.files.thumbnail[0].buffer)
        .resize(800, 600)
        .webp({ quality: 80 })
        .toBuffer();

      const thumbnailUpload = await uploadToCloudinary(thumbnailBuffer);
      thumbnailUrl = thumbnailUpload.secure_url;
    }

    if (req.files?.previewImage) {
      const previewBuffer = await sharp(req.files.previewImage[0].buffer)
        .resize(800, 600)
        .webp({ quality: 80 })
        .toBuffer();

      const previewUpload = await uploadToCloudinary(previewBuffer);
      previewImageUrl = previewUpload.secure_url;
    }
    let parsedDynamicFields = [];
    if (dynamicFields) {
      parsedDynamicFields = JSON.parse(dynamicFields); // Frontend se string aaye to JSON parse karega
    }
    // Save job in database
    const job = new JobCollection({
      title,
      category,
      experience,
      deadline,
      description,
      content,
      status,
      dynamicFields :parsedDynamicFields,
      thumbnail: thumbnailUrl,
      previewImage: previewImageUrl,
    });


    await job.save();

    // Update jobCount in Category
    await jobCategory.findByIdAndUpdate(category, { $inc: { jobCount: 1 } });

    res.status(201).json(job);
  } catch (error) {
  console.log(error)
    res.status(400).json({ error: error.message });
  }
};


// Get all jobs

export const getAllJobs = async (req, res) => {
  try {
      const jobs = await JobCollection.find();
      res.status(200).json(jobs);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

  

// Get a single job by ID
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
 if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Job ID format" });
    }
 const job = await JobCollection.find({category:id}).populate("category", "name");
 if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
  res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  try {
    const updatedJob = await JobCollection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const job = await JobCollection.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Decrease jobCount in Category
    await jobCategory.findByIdAndUpdate(job.category, { $inc: { jobCount: -1 } });

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
