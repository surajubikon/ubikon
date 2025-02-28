import mongoose from "mongoose";
const ActivityUbikon = ["Culture", "Work", "Event", "Team"];

const activitySchema = new mongoose.Schema({
  images: {
    type: [String], // Array of image URLs
    required: [true, "Please add at least one image"],
  },
  subject: { 
    type: String, 
    required: true, 
    enum: ActivityUbikon 
  },
}, { timestamps: true });

const Activity = mongoose.model('activityUbikon', activitySchema);
export default Activity;
