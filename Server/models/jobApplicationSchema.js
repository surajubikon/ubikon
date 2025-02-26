import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
    {
        first: { type: String, required: true },
        last: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }, // Changed to String
        currentCTC: { type: Number, required: true },
        expectedCTC: { type: Number, required: true },
        noticePeriod: { type: Number, required: true },
        resume: { type: String },  // Keep optional or add `required: true`
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending",
        },
        portfoliolink: { type: String },
    },
    { timestamps: true }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
export default JobApplication;
