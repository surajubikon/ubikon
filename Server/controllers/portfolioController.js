import Portfolio from "../models/portfolioSchema.js";

import fs from 'fs';
import path from "path";

export const createPortfolio = async (req, res) => {
  const { title, description, technologies, publishedAt } = req.body;

  try {
    if (!title || !description || !technologies || !publishedAt) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Generate slug
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen

    // Slug uniqueness check
    const existingPortfolio = await Portfolio.findOne({ slug });
    if (existingPortfolio) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    // ✅ Multiple images handling
    let imageUrls = req.files.map(file => "/uploads/portfolio/" + file.filename);

    const newPortfolio = new Portfolio({
      title,
      slug,
      description,
      technologies: Array.isArray(technologies) ? technologies : technologies.split(","), // Ensure array format
      image: imageUrls,  // ✅ Store array in DB
      publishedAt,
    });

    await newPortfolio.save();
    res.status(201).json({ message: "Portfolio created successfully", data: newPortfolio });
  } catch (error) {
    console.error("Error creating portfolio:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// ✅ Get All Portfolios
export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get Portfolio by Slug
export const getportfolioBySlug = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ slug: req.params.slug });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Portfolio
export const updatePortfolio = async (req, res) => {
  try {
    const { title, description, technologies, publishedAt } = req.body;

    // 🛠️ Find existing portfolio
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // 🖼️ Keep old images if no new images are uploaded
    let imageUrls = portfolio.image;

    // ✅ Handle new image uploads
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => "/uploads/portfolio/" + file.filename);
    }

    // 🏷️ Generate new slug if title is changed
    let newSlug = portfolio.slug;
    if (title && title !== portfolio.title) {
      newSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

      // ✅ Check if new slug already exists
      const existingPortfolio = await Portfolio.findOne({ slug: newSlug });
      if (existingPortfolio && existingPortfolio._id.toString() !== portfolio._id.toString()) {
        return res.status(400).json({ message: "Slug already exists, try a different title" });
      }
    }

    // 📝 Update portfolio fields
    portfolio.title = title || portfolio.title;
    portfolio.slug = newSlug;
    portfolio.description = description || portfolio.description;
    portfolio.technologies = technologies ? technologies.split(",") : portfolio.technologies;
    portfolio.image = imageUrls;  // ✅ Store updated image array
    portfolio.publishedAt = publishedAt || portfolio.publishedAt;

    // 💾 Save updated portfolio
    await portfolio.save();
    res.status(200).json({ message: "Portfolio updated successfully", data: portfolio });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// ✅ Delete Portfolio
export const deletePortfolio = async (req, res) => {
  try {
    // 🔍 Find Portfolio
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // 🗑️ Delete images from folder
    if (portfolio.image && Array.isArray(portfolio.image)) {
      portfolio.image.forEach((imagePath) => {
        const fullPath = path.join("public", imagePath); // Convert to full path
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath); // Delete file
          console.log(`Deleted: ${fullPath}`); // Just for debugging
        }
      });
    }

    // ❌ Delete portfolio from database
    await Portfolio.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Portfolio and its images deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};