import Testimonial from "../models/testimonialSchema.js";
import fs from "fs";
import path from "path";

// Helper function to create slug
const generateSlug = (text) => {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
};

export const createTestimonial = async (req, res) => {
  const { heading, name, paragraph, video } = req.body;

  try {
    if (!heading || !name || !paragraph) {
      return res.status(400).json({ success: false, message: "Heading, name, and paragraph are required." });
    }

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

    // ✅ **Fixed req.file usage**
    let imageUrl = req.file ? "/uploads/testimonial/" + req.file.filename : "";

    // ✅ **Create testimonial**
    const testimonial = await Testimonial.create({
      heading,
      name,
      paragraph,
      image: imageUrl,
      video,
      slug,
    });

    res.status(201).json({ success: true, message: "Testimonial created successfully", testimonial });
  } catch (error) {
    console.error("Error in createTestimonial:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const { heading, name, paragraph, video } = req.body;

  try {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }

    let updatedFields = { heading, name, paragraph, video };

    // **Slug Update if Heading is Changed**
    if (heading) {
      updatedFields.slug = heading.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
    }

    // **Handle Single Image Upload**
    if (req.file) {
      // **Old Image Delete from Server**
      if (testimonial.image) {
        const oldImagePath = path.join("public", testimonial.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }

      // **Set New Image**
      updatedFields.image = "/uploads/testimonial/" + req.file.filename;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({ success: true, message: "Testimonial updated successfully", testimonial: updatedTestimonial });
  } catch (error) {
    console.error("Error in updateTestimonial:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // ✅ **Check if image exists and delete it**
    if (testimonial.image) {  // Image is a string, not an array
      const fullPath = path.join("public", testimonial.image);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

    await Testimonial.findByIdAndDelete(id);
    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTestimonial:", error);
    res.status(500).json({ message: error.message });
  }
};
export const getTestimonial = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTestimonialBySlug = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne({ slug: req.params.slug });
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
    res.status(200).json(testimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching the testimonial" });
  }
};