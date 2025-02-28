import Activity from "../models/activitySchema.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import sharp from 'sharp';
const ActivityUbikon = ["Culture", "Work", "Event", "Team"];

export const createActivity = async (req, res) => {
 
    const { subject } = req.body;
   
    try {

        if (!subject || !ActivityUbikon.includes(subject)) {
            return res.status(400).json({ message: "Invalid or missing subject." });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one image is required." });
        }

        let imageUrl = [];

        for (let file of req.files) {
            const imageBuffer = await sharp(file.buffer)
                .resize(800, 600)
                .webp({ quality: 80 })
                .toBuffer();

            const imageUpload = await uploadToCloudinary(imageBuffer);
            imageUrl.push(imageUpload.secure_url);
        }

        const activity = await Activity.create({
            images: imageUrl, // Store all image URLs as an array
            subject,
        });

        res.status(201).json(activity);
    } catch (error) {
        console.error("Error in createActivity:", error);
        res.status(500).json({ message: error.message });
    }
};
export const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find().sort({ createdAt: -1 });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllActivitiesById = async (req, res) => {
    try {
        const { subject } = req.params;
        // Case-insensitive query
        const activities = await Activity.find({ subject: new RegExp(`^${subject}$`, "i") });

        if (activities.length === 0) {
            return res.status(404).json({ message: "No activities found for this subject" });
        }

        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateActivity = async (req, res) => {
    const { id } = req.params;
    const { subject } = req.body;
    const updates = {};

    try {
        if (subject && ActivityUbikon.includes(subject)) {
            updates.subject = subject;
        }

        if (req.files && req.files.length > 0) {
            let imageUrls = [];

            for (let file of req.files) {
                const imageBuffer = await sharp(file.buffer)
                    .resize(800, 600)
                    .webp({ quality: 80 })
                    .toBuffer();

                const imageUpload = await uploadToCloudinary(imageBuffer);
                imageUrls.push(imageUpload.secure_url);
            }

            updates.images = imageUrls; // Overwrite previous images
        }

        const updatedActivity = await Activity.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedActivity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        res.json(updatedActivity);
    } catch (error) {
        console.error("Error in updateActivity:", error);
        res.status(500).json({ message: error.message });
    }
};
export const deleteActivity = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedActivity = await Activity.findByIdAndDelete(id);
        if (!deletedActivity) {
            return res.status(404).json({ message: "Activity not found" });
        }
        res.json({ message: "Activity deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};