import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    qty: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
    },
    total: {
        type: Number,
    }
});

const milestoneSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    percentage: {
        type: Number,
    },
});

const quotationSchema = new mongoose.Schema(
    {
        quotationNo: {
            type: Number,
            default: 0,
        },
        quotationDate: {
            type: Date,
        },
        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
        },
        name: {
            type: String,
        },
        company: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        image: {
            type: String,
        },
        items: [itemSchema],
        projectOverview: {
            type: String,
        },
        projectDetails: {
            type: String,
        },
        milestone: [milestoneSchema],
        totalAmount: {
            type: Number,
        },
        isDelete: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date
        }
    },
    { timestamps: true }
);

const Quotation = mongoose.model("Quotation", quotationSchema);

export default Quotation;
