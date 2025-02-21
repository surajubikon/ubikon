
import mongoose from "mongoose";

const jobCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    jobCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const jobCategory = mongoose.model("jobCategory", jobCategorySchema);

export default jobCategory;
