import jobCategory from "../models/jobCategorySchema.js";

export const jobCreateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new jobCategory({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all categories
export const jobGetCategories = async (req, res) => {
  try {
    const categories = await jobCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single category by ID
export const jobGetCategoryById = async (req, res) => {
  try {
    const category = await jobCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category by ID
export const jobUpdateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await jobCategory.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a category by ID
export const jobDeleteCategory = async (req, res) => {
  try {
    const category = await jobCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};