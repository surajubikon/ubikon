import mongoose from 'mongoose';

const allowedSubjects = ["Mobile App Development", "Web Development", "UI/UX Design", "Digital Marketing","Search Engine Optimization (SEO)"];

const contactSchema = new mongoose.Schema({
  yourName: { type: String, required: true },
  subject: { type: String, required: true, enum: allowedSubjects }, // Restrict to allowed values
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  textMessage: { type: String, required: true, maxlength: 5000 }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt


const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
