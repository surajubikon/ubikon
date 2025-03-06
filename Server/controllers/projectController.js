
import Project from "../models/projectSchema.js";
import path from "path";
import fs from "fs";
export const createProject = async (req, res) => {
    try {
        const { title, heading, description, content, subject, videoLink, projectLink } = req.body;

        if (!title || !heading || !description || !subject) {
            return res.status(400).json({ message: "Title, heading, description, and subject are required." });
        }

      
        const validSubjects = [
            "Web Development",
            "Mobile App Development",
            "Artificial Intelligence & Machine Learning",
            "SEO (Search Engine Optimization)",
            "Social Media Marketing",
            "Blockchain Development",
            "UI/UX",
            "Game Development",
            "IoT (Internet of Things) Solutions",
        ];
        if (!validSubjects.includes(subject)) {
            return res.status(400).json({ message: "Invalid subject." });
        }

       
        if (!req.files || !req.files.images || req.files.images.length === 0) {
            return res.status(400).json({ message: "At least one image is required." });
        }
        let imageUrls = req.files.images.map(file => "/uploads/project/" + file.filename);

        
        if (!req.files.logo || req.files.logo.length === 0) {
            return res.status(400).json({ message: "Logo image is required." });
        }
        let logoUrl = "/uploads/project/" + req.files.logo[0].filename;

        
        const project = await Project.create({
            title,
            heading,
            description,
            images: imageUrls,
            logo: logoUrl,
            videoLink,
            projectLink,
            subject,
            content,
        });

        res.status(201).json({ success: true, message: "Project created successfully", project });
    } catch (error) {
        console.error("Error in createProject:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getProject = async (req, res) => {
    try {
      const projects = await Project.find(); 
  
      if (!projects || projects.length === 0) {
        return res.status(404).json({ message: "No projects found" });
      }
  
      res.status(200).json({ success: true, projects });
    } catch (error) {
      console.error("Error in getProject:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  


  export const updateProject = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, heading, description, content, subject, videoLink, projectLink } = req.body;
  
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      // ✅ Remove old images if new ones are uploaded
      let imageUrls = project.images; 
      if (req.files.images) {
        // 🛑 Delete old images from folder
        project.images.forEach((img) => {
          const filePath = path.join("public", img);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
  
        // ✅ Save new images
        imageUrls = req.files.images.map((file) => "/uploads/project/" + file.filename);
      }
  
      // ✅ Remove old logo if new one is uploaded
      let logoUrl = project.logo;
      if (req.files.logo) {
        const logoPath = path.join("public", project.logo);
        if (fs.existsSync(logoPath)) {
          fs.unlinkSync(logoPath);
        }
        logoUrl = "/uploads/project/logo/" + req.files.logo[0].filename;
      }
  
      // ✅ Update project details
      project.title = title || project.title;
      project.heading = heading || project.heading;
      project.description = description || project.description;
      project.images = imageUrls;
      project.logo = logoUrl;
      project.videoLink = videoLink || project.videoLink;
      project.projectLink = projectLink || project.projectLink;
      project.subject = subject || project.subject;
      project.content = content || project.content;
  
      await project.save();
      res.status(200).json({ success: true, message: "Project updated successfully", project });
    } catch (error) {
      console.error("Error in updateProject:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  export const deleteProject = async (req, res) => {
    try {
      const { id } = req.params;
  
      let project = await Project.findById(id);
      if (!project) return res.status(404).json({ message: "Project not found" });
  
      
      project.images.forEach((image) => {
        const imagePath = path.join("public", image);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      });
  
      const logoPath = path.join("public", project.logo);
      if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);
  
   
      await Project.findByIdAndDelete(id);
  
      res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error in deleteProject:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const getProjectById = async (req, res) => {
    try {
      const { subject } = req.params;
      const project = await Project.findOne({ subject });
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      res.status(200).json({ success: true, project });
    } catch (error) {
      console.error("Error in getProjectById:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };  