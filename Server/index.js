// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import BlogpostRoutes from "./routes/blogPostRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import aiChatRoutes from "./routes/aiChatRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/blogpost", BlogpostRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/aichat", aiChatRoutes);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
