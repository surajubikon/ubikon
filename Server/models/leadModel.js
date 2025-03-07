import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        company: {
            type: String,
        },
        address: {
            type: String
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        status: { type: String, enum: ["New", "Contacted", "Interested", "Converted", "Not Interested"], default: "New" },
        source: { type: String},
        projectName: {
            type: String
        },
        projectType: {
            type: String
        },
        projectBudget: {
            type: Number
        },
        projectRequirements: {
            type: String
        },
    },
    { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
