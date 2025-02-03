import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  yourName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  textMessage: { type: String, required: true, maxlength: 500 },
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
