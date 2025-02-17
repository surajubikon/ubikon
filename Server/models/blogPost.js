import mongoose from "mongoose";

const BlogpostSchema = new mongoose.Schema(

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
    
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    previewImage: {
      type: String,
    },
    content: { // New field for TinyMCE content
      type: String,
    },
    seometa : {
      type: String,
    },
    coverImage: {
      type: String,
    },
   
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);




export default mongoose.model("PostCategory", BlogpostSchema);
