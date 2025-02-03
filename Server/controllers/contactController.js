import Contact from '../models/Contact.js';
import sendEmail from '../email/email.js'; // Import sendEmail function
import verifyEmailTemplate from '../email/template.email.js'

export const createContact = async (req, res) => {
  try {
    const { yourName, companyName, email, contactNumber, textMessage } = req.body;

    // Database mein contact ko save karo
    const contact = new Contact({ yourName, companyName, email, contactNumber, textMessage });
    await contact.save();

    // Email ke liye template generate karo
    const emailContent = verifyEmailTemplate({ 
      name: yourName, 
      yourName, 
      companyName, 
      email, 
      contactNumber, 
      textMessage 
    });

    // Email bhejne ka function call karo
    const emailInfo = await sendEmail({
      sendTo: 'amaankhan.ubikon@gmail.com', // Yeh wo email address hai jahan aapko notification jana hai
      subject: 'New Contact Form Submission', // Subject line
      formData: { yourName, companyName, email, contactNumber, textMessage }, // Form data jo email mein bhejna hai
      html: emailContent, // Template se generated HTML content
    });


    // Success response bhejo
    res.status(201).json({ message: 'Contact created successfully', contact });
  } catch (error) {
   
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
  