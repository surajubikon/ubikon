import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  yourName: { type: String, required: true },
  subject: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  textMessage: { type: String, required: true, maxlength: 500 },
  agree: { type: Boolean, required: true } // Add this field
});


const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
