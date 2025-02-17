import Contact from '../models/Contact.js';
import sendEmail from '../email/email.js'; // Import sendEmail function
import verifyEmailTemplate from '../email/template.email.js';
import { validationResult } from 'express-validator';
const allowedSubjects = ["Mobile App Development", "Web Development", "UI/UX Design", "Digital Marketing","Search Engine Optimization (SEO)"];

export const createContact = async (req, res) => {
  try {
  

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation failed", errors: errors.array() });
    }

    const { yourName, subject, email, contactNumber, textMessage } = req.body;

    if (!allowedSubjects.includes(subject)) {
      return res.status(400).json({ message: "Invalid subject selected" });
    }

     // Custom date and time
     const date = new Date().toISOString().split('T')[0];  // YYYY-MM-DD
     const time = new Date().toLocaleTimeString();  // HH:MM:SS AM/PM
 

    // Database mein contact ko save karo
    const contact = new Contact({ yourName, subject, email, contactNumber, textMessage, date, time });
    await contact.save();

    // Email ke liye template generate karo
    const emailContent = verifyEmailTemplate({ 
      name: yourName, 
      yourName, 
      subject, 
      email, 
      contactNumber, 
      textMessage,
      date,
      time
    });

    // Email bhejne ka function call karo
    await sendEmail({
      sendTo: 'yourrony@gmail.com',
      subject: 'Ubikon Technologies Contact Form Submission',
      formData: { yourName, subject, email, contactNumber, textMessage,date, time },
      html: emailContent,
    });

    res.status(201).json({ message: 'Contact created successfully', contact });
  } catch (error) {
    console.error("Error creating contact:", error); // Debugging error
    res.status(500).json({ message: 'Failed to create contact', error: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts', error: error.message });
  }
};
