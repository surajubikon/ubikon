import Activity from "../models/activitySchema.js";
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

        // 🟢 Loop lagakar sabhi image URLs ko array me store karenge
        let imageUrls = req.files.map(file => "/uploads/activity/" + file.filename);

        const activity = await Activity.create({
            images: imageUrls, // Array of image URLs
            subject,
        });

        res.status(201).json(activity);
    } catch (error) {
        console.error("Error in createActivity:", error);
        res.status(500).json({ message: "Internal Server Error" });
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
        console.log("Received ID:", id);

        if (subject && ActivityUbikon.includes(subject)) {
            updates.subject = subject;
        }

        if (req.files && req.files.length > 0) {
            let imageUrls = req.files.map(file => "/uploads/activity/" + file.filename);
            updates.images = imageUrls; // Overwrite previous images
        }

        const updatedActivity = await Activity.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedActivity) {
            console.log("Activity not found for ID:", id);
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