import mongoose from "mongoose";

const ProjectsList = [
  "Web Development",
  "Mobile App Development",
  "Artificial Intelligence & Machine Learning",
  "SEO (Search Engine Optimization)",
  "Social Media Marketing",
  "Blockchain Development",
  "UI/UX",
  "Game Development",
  "IoT (Internet of Things) Solutions",
];

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a project title"],
    },
    heading: {
      type: String,
      required: [true, "Please provide a heading"],
    },
    description: {
      type: String,
      required: [true, "Please provide a project description"],
    },
    images: {
      type: [String], // Array of image URLs
      required: [true, "Please add at least one image"],
    },
    logo: {
      type: String, // Logo image URL
      required: [true, "Please provide a logo"],
    },
    videoLink: {
      type: String, // Video URL (YouTube, Vimeo, etc.)
      required: false,
    },
    projectLink: {
      type: String, // Project live/demo link
      required: false,
    },
    content:{
        type: String,
        required: [true, "Please provide a content"],
    },
    subject: {
      type: String,
      required: true,
      enum: ProjectsList,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("projectlist", projectSchema);
export default Project;
