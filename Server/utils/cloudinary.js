import cloudinary from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Your Cloudinary Cloud Name
  api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API Key
  
  api_secret: process.env.CLOUDINARY_API_SECRET  // Your Cloudinary API Secret
});
// console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);

export default cloudinary;
