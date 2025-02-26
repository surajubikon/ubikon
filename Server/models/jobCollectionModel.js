// models/jobCollectionModel.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobCategory",
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
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
    content: { type: String }, 
    status: {
      type: String,
      enum: ["Active", "Expired"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const JobCollection = mongoose.model("JobCollection", jobSchema);

export default JobCollection;
