import mongoose from "mongoose";

const postCategorySchema = new mongoose.Schema(

  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    headings: [{
      type: String,
    }],
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {  // ✅ Now storing author name instead of ObjectId
      type: String,
      required: true,
    },
    tags: [{
      type: String,
    }],
    categories: [{  // ✅ Now stores category names instead of ObjectIds
      type: String,
    }],
    seoTitle: {
      type: String,
    },
    seoMetaDescription: {
      type: String,
    },
    seoKeywords: [{
      type: String,
    }],
    thumbnail: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ["draft", "published", "scheduled"],
      default: "draft",
    },
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);




export default mongoose.model("PostCategory", postCategorySchema);
