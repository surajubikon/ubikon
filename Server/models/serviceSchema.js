import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(

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
    dynamicFields: [
      {
        heading: { type: String }, 
        value: { type: String },   
      }
    ],
    thumbnail: {
      type: String,
    },
    previewImage: {
      type: String,
    },
    ckeditor: { type: String }, 
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




export default mongoose.model("service", ServiceSchema);
