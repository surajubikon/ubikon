import PostCategory from "../models/PostCategory.js";

// Create a post category
export const createPostCategory = async (req, res) => {
  const { name, slug, seoTitle, seoMetaDescription } = req.body;

  try {
    const categoryExists = await PostCategory.findOne({ slug });
    if (categoryExists) {
      return res.status(400).json({ message: "Category with this slug already exists" });
    }

    const category = await PostCategory.create({
      name,
      slug,
      seoTitle,
      seoMetaDescription,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all categories
export const getPostCategories = async (req, res) => {
  try {
    const categories = await PostCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post category by ID
export const updatePostCategory = async (req, res) => {
  const { id } = req.params; // Get the category ID from the URL params
  const { name, slug, seoTitle, seoMetaDescription } = req.body;

  try {
    // Check if category exists
    const category = await PostCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if the new slug already exists (optional)
    const categoryExists = await PostCategory.findOne({ slug });
    if (categoryExists && categoryExists._id.toString() !== id) {
      return res.status(400).json({ message: "Category with this slug already exists" });
    }

    // Update category
    category.name = name || category.name;
    category.slug = slug || category.slug;
    category.seoTitle = seoTitle || category.seoTitle;
    category.seoMetaDescription = seoMetaDescription || category.seoMetaDescription;

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post category by ID
export const deletePostCategory = async (req, res) => {
  const { id } = req.params; // Get the category ID from the URL params

  try {
    // Check if category exists
    const category = await PostCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete category
    await category.remove();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
