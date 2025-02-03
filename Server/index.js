import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import postCategoryRoutes from "./routes/postCategoryRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

connectDB();

const app = express();
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/categories", postCategoryRoutes);
app.use("/api/posts", postRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 
  console.log(`Server running on port ${PORT}`);
});
