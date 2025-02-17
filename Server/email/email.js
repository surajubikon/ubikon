import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Ensure EMAIL_USER and EMAIL_PASS are defined in the .env file
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("EMAIL_USER or EMAIL_PASS is not defined in the .env file");
}

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail service
  auth: {
    user: process.env.EMAIL_USER, // Your email address from .env
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password from .env
  },
  tls: {
    rejectUnauthorized: false, // Ignore certificate validation errors
  },
});

// Function to send email
const sendEmail = async ({ sendTo, subject, formData }) => {
   // Log the recipient's email for debugging purposes

  // Create an email content based on the form data
  const htmlContent = `
    <h3>New Contact Form Submission</h3>
    <p><strong>Name:</strong> ${formData.yourName}</p>
    <p><strong>Subject:</strong> ${formData.subject}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Contact Number:</strong> ${formData.contactNumber}</p>
    <p><strong>Message:</strong> ${formData.textMessage}</p>
  `;

  try {
    // Send the email
    const info = await transporter.sendMail({
      from: `"Ubikon Technologies" <${process.env.EMAIL_USER}>`, // sender address
      to: sendTo, // receiver address (backend ko jana hai)
      subject: subject, // subject line
      html: htmlContent, // html body
    });

    return info; // Return the email information
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Throw an error if sending fails
  }
};

export default sendEmail;
