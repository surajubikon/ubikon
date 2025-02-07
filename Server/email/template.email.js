const verifyEmailTemplate = ({ yourName, subject, email, contactNumber, textMessage }) => {
    return `
        <p>Dear ${yourName},</p>
        
        <p>Thank you for reaching out to us! We have received your contact form submission. Here are the details you provided:</p>
        
        <h3>Contact Information:</h3>
        <ul>
            <li><strong>Name:</strong> ${yourName}</li>
            <li><strong>Subject:</strong> ${subject}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Contact Number:</strong> ${contactNumber}</li>
            <li><strong>Message:</strong> ${textMessage}</li>
        </ul>
        
        <p>Our team will get back to you shortly. Thank you for your inquiry!</p>

        <p>Best regards,</p>
        <p>Your Company Name</p>
    `;
};

export default verifyEmailTemplate;
