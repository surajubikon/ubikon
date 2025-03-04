import JobCollection from "../models/jobCollectionModel.js";
import jobCategory from "../models/jobCategorySchema.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Create a new job
export const createJob = async (req, res) => {
  try {
    const { title, category, experience, deadline, description, content, status, dynamicFields } = req.body;

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    // ✅ Convert deadline string to Date object
    const formattedDeadline = new Date(deadline);
    if (isNaN(formattedDeadline.getTime())) {
      return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD or ISO format." });
    }

    let thumbnailUrl = req.files?.thumbnail ? `/uploads/jobcollection/${req.files.thumbnail[0].filename}` : "";
    let previewImageUrl = req.files?.previewImage ? `/uploads/jobcollection/${req.files.previewImage[0].filename}` : "";

    let parsedDynamicFields = [];
    if (dynamicFields) {
      parsedDynamicFields = JSON.parse(dynamicFields);
    }

    const job = new JobCollection({
      title,
      category,
      experience,
      deadline: formattedDeadline, // ✅ FIXED
      description,
      content,
      status,
      dynamicFields: parsedDynamicFields,
      thumbnail: thumbnailUrl,
      previewImage: previewImageUrl,
    });

    await job.save();
    await jobCategory.findByIdAndUpdate(category, { $inc: { jobCount: 1 } });

    res.status(201).json(job);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const existingJob = await JobCollection.findById(id);
    if (!existingJob) return res.status(404).json({ message: "Job not found" });

    let thumbnailUrl = existingJob.thumbnail;
    let previewImageUrl = existingJob.previewImage;

    // If new thumbnail is uploaded, replace the old one
    if (req.files?.thumbnail) {
      if (existingJob.thumbnail) {
        const oldThumbnailPath = path.join("public", existingJob.thumbnail);
        if (fs.existsSync(oldThumbnailPath)) {
          fs.unlinkSync(oldThumbnailPath); // Delete old file
        }
      }
      thumbnailUrl = `/uploads/jobcollection/${req.files.thumbnail[0].filename}`;
    }

    // If new previewImage is uploaded, replace the old one
    if (req.files?.previewImage) {
      if (existingJob.previewImage) {
        const oldPreviewImagePath = path.join("public", existingJob.previewImage);
        if (fs.existsSync(oldPreviewImagePath)) {
          fs.unlinkSync(oldPreviewImagePath); // Delete old file
        }
      }
      previewImageUrl = `/uploads/jobcollection/${req.files.previewImage[0].filename}`;
    }

    const updatedJob = await JobCollection.findByIdAndUpdate(id, {
      ...req.body,
      thumbnail: thumbnailUrl,
      previewImage: previewImageUrl
    }, { new: true });

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await JobCollection.findByIdAndDelete(id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Delete images from folder
    if (job.thumbnail) {
      const thumbnailPath = path.join("public", job.thumbnail);
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
      }
    }

    if (job.previewImage) {
      const previewImagePath = path.join("public", job.previewImage);
      if (fs.existsSync(previewImagePath)) {
        fs.unlinkSync(previewImagePath);
      }
    }

    // Decrease jobCount in Category
    await jobCategory.findByIdAndUpdate(job.category, { $inc: { jobCount: -1 } });

    res.status(200).json({ message: "Job and associated images deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

// Get job collection by category
export const getJobCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobs = await JobCollection.find({ category: id }).populate("category");
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
    const job = await JobCollection.findById(id).populate("category", "name");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
