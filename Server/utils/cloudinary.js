import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error);
        return reject(error);
      }
      resolve(result);
    }).end(buffer);
  });
};

export default cloudinary;