import JobApplication from "../models/jobApplicationSchema.js";
import mongoose from "mongoose";

// Create Job Application
export const createJobApplication = async (req, res) => {
  try {
    const { position,first, last, email, phone, currentCTC, expectedCTC, noticePeriod, portfoliolink } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    }
    let resumeUrl = req.file.filename ? "/uploads/resume/" + req.file.filename : null;
    
    const jobApplication = new JobApplication({
      position,
      first,
      last,
      email,
      phone,
      currentCTC,
      expectedCTC,
      noticePeriod,
      resume: resumeUrl,
      portfoliolink,
      
    });

    await jobApplication.save();
    res.status(201).json(jobApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Job Applications
export const getJobApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Job Application by ID
export const getJobApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid application ID" });
    }

    const application = await JobApplication.findById(id);
    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Job Application Status
export const updateJobApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid application ID" });
    }

    const application = await JobApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const addRemarkApplication = async (req, res) => {
  try {
      const { id } = req.params;
      const { remark } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        
          return res.status(400).json({ error: "Invalid application ID" });
      }

      if (!remark || remark.trim() === "") {
          return res.status(400).json({ message: "Remark cannot be empty" });
      }

      const updatedApplication = await JobApplication.findByIdAndUpdate(
          id, 
          { remark }, 
          { new: true }
      );

      if (!updatedApplication) {
          return res.status(404).json({ message: "Application not found" });
      }

      res.status(200).json(updatedApplication);
  } catch (error) {
      console.log("Error updating remark:", error);
      res.status(500).json({ message: "Server Error", error });
  }
};


// Delete Job Application
export const deleteJobApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid application ID" });
    }

    const application = await JobApplication.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
