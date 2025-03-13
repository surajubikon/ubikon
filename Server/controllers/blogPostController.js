import Blogposts from "../models/blogPost.js";
import sharp from "sharp";
export const createBlogPost = async (req, res) => {
  const { title, content, description, seometa , publishedAt } = req.body;
  
  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') 
      .replace(/\s+/g, '-') 
      .replace(/-+/g, '-'); 

    const postExists = await Blogposts.findOne({ slug });
    if (postExists) {
      return res.status(400).json({ message: "Post with this slug already exists" });
    }

    // Handle image uploads
    let thumbnailUrl = req.files?.thumbnail ? `/uploads/blogpost/${req.files.thumbnail[0].filename}` : "";
    let coverImageUrl = req.files?.coverImage ? `/uploads/blogpost/${req.files?.coverImage[0].filename}`:"";
    let previewImageUrl = req.files?.previewImage? `/uploads/blogpost/${req.files?.previewImage[0].filename}`: ""; // New variable for Preview Image



    // Create the blog post with image URLs
    const blogPost = await Blogposts.create({
      title,
      slug,
      content: content||" default",
      description,
      seometa,
      publishedAt,
      thumbnail: thumbnailUrl,
      coverImage: coverImageUrl,
      previewImage: previewImageUrl, 
    });

    res.status(201).json(blogPost);
  } catch (error) {
    console.error("Error in createBlogPost:", error);
    res.status(500).json({ message: error.message });
  }
};


// Get all blog posts
export const getBlogPosts = async (req, res) => {
  try {
    const blogPosts = await Blogposts.find().sort({ createdAt: -1 });
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogPostById = async (req, res) => {
  const { id } = req.params;
 
  try {
    const blogPost = await Blogposts.find({ slug: id });
    if (!blogPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const { title, content, description, seometa, publishedAt } = req.body;
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

    // Handle image uploads if provided and process with Sharp
    if (req.files?.thumbnail) {
      // Resize and compress thumbnail image using Sharp
      const thumbnailBuffer = await sharp(req.files.thumbnail[0].buffer)
        .resize(800, 600)  // Resize image to 800x600
        .webp({ quality: 80 })  // Compress to 80% quality (JPEG format)
        .toBuffer();  // Get processed image as buffer

      // Upload the processed thumbnail to Cloudinary
      const thumbnailUpload = await uploadToCloudinary(thumbnailBuffer);
      updatedFields.thumbnail = thumbnailUpload.secure_url;
    }

    if (req.files?.coverImage) {
      // Resize and compress cover image using Sharp
      const coverImageBuffer = await sharp(req.files.coverImage[0].buffer)
        .resize(1200, 800)  // Resize image to 1200x800
        .webp({ quality: 80 })  // Compress to 80% quality (JPEG format)
        .toBuffer();  // Get processed image as buffer

      // Upload the processed cover image to Cloudinary
      const coverImageUpload = await uploadToCloudinary(coverImageBuffer);
      updatedFields.coverImage = coverImageUpload.secure_url;
    }

    // Handle Preview Image upload if provided
    if (req.files?.previewImage) {
      // Resize and compress preview image using Sharp
      const previewImageBuffer = await sharp(req.files.previewImage[0].buffer)
        .resize(400, 300)  // Resize image to 400x300 for preview
        .webp({ quality: 80 })  // Compress to 80% quality (WebP format)
        .toBuffer();  // Get processed image as buffer

      // Upload the processed preview image to Cloudinary
      const previewImageUpload = await uploadToCloudinary(previewImageBuffer);
      updatedFields.previewImage = previewImageUpload.secure_url;
    }

    // Update the blog post
    const updatedPost = await Blogposts.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error('Error in updateBlogPost:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog post
export const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Blogposts.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getBlogPostBySlug = async (req, res) => {
  const { slug } = req.params; // Get slug from URL params

  try {
    const blogPost = await Blogposts.findOne({ slug }); // Find blog post by slug
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching the blog post" });
  }
};