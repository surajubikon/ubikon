import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true }, // Ek hi image ke liye field
    video: { type: String }, // Video URL ya file path store karne ke liye
    paragraph: { type: String, required: true },
    slug: { type: String, unique: true, required: true }, // Unique slug for SEO-friendly URLs
  },
  { timestamps: true } // Date and time automatically add ho jayega
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
