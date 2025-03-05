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

const quotationSchema = new mongoose.Schema(
    {
        quotationNo: {
            type: Number,
            default: 0,
        },
        quotationDate: {
            type: Date,
        },
        image: {
            type: String,
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
        items: [itemSchema],
        projectOverview: {
            type: String,
        },
        projectDetails: {
            type: String,
        },
        milestone: [{
            type: String,
        }],
        totalAmount: {
            type: Number,
        }
    },
    { timestamps: true }
);

const Quotation = mongoose.model("Quotation", quotationSchema);

export default Quotation;
