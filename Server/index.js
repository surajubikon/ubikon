// app.js
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import BlogpostRoutes from "./routes/blogPostRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import aiChatRoutes from "./routes/aiChatRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import subServiceRoutes from "./routes/subServiceRoutes.js";
import { trackEvent } from "./utils/analytics.js";
import jobCategoryRoutes from "./routes/jobCategoryRoutes.js";
import jobCollectionRoutes from "./routes/jobCollectionRoutes.js";
import portpolioRoute from "./routes/portpolioRoute.js";
import leadRoutes from "./routes/leadRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js"
import jobApplicationFormRoutes from "./routes/jobApplicationFormRoutes.js";
import ActivityRoutes from "./routes/activityRoutes.js";
import milestoneRoutes from './routes/milestoneRoutes.js'
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());


const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'public')));
// Middleware for Google Analytics tracking
app.use((req, res, next) => {
    if (req.method !== "OPTIONS") {
      trackEvent("API Request", req.method, req.originalUrl);
    }
    next();
  });

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/blogpost", BlogpostRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/sub-services", subServiceRoutes);
app.use("/api/aichat", aiChatRoutes);
app.use("/api/jobCategory", jobCategoryRoutes)
app.use("/api/jobCollection", jobCollectionRoutes)
app.use("/api/portfolio" ,portpolioRoute )
app.use("/api/leads", leadRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/jobApplicationForm", jobApplicationFormRoutes);
app.use("/api/activity",ActivityRoutes);
app.use("/api/milestone",milestoneRoutes);
app.use("/api/project",projectRoutes);



app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    trackEvent("API Error", req.method, req.originalUrl, err.message);
    res.status(500).json({ error: "Internal Server Error" });
  });

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
