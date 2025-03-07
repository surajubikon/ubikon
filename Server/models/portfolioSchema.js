import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
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
    image: { type: [String], required: true },
    technologies: [
      {
        type: String,
        required: true, // Ensure that each tag has a value
      },
    ],
    publishedAt: {
      type: Date,
      default: Date.now, // Default current date
    },
  },
  { timestamps: true }
);

export default mongoose.model("portfolio", PortfolioSchema);
