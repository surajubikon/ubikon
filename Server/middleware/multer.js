// // import multer from "multer";

// // const storage = multer.diskStorage({
// //   destination(req, file, cb) {
// //     cb(null, "uploads/"); // Save files to "uploads/" folder
// //   },
// //   filename(req, file, cb) {
// //     cb(null, `${Date.now()}-${file.originalname}`);
// //   },
// // });

// // const upload = multer({
// //   storage,
// //   fileFilter(req, file, cb) {
// //     if (file.mimetype.startsWith("image")) {
// //       cb(null, true);
// //     } else {
// //       cb(new Error("Only image files are allowed"), false);
// //     }
// //   },
// // });

// // export default upload;

// import multer from 'multer';

// // Set storage for multer (temporary location before Cloudinary upload)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');  // Specify temporary folder to store images
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);  // Unique filename based on the current time
//   },
// });

// const upload = multer({ storage });

// export default upload;
import multer from 'multer';

const storage = multer.memoryStorage();  // Use memoryStorage instead of diskStorage for Cloudinary upload

const upload = multer({ storage ,  limits: { fileSize: 5 * 1024 * 1024 }});

export default upload;
