import mongoose from "mongoose";

const postCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    seoTitle: {
      type: String,
    },
    seoMetaDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PostCategory", postCategorySchema);
