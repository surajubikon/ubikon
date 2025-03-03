import Quotation from "../models/quotationModel.js";

export const createQuotation = async (req, res) => {
    try {
        const {
            quotationNo,
            quotationDate,
            name,
            company,
            email,
            phone,
            address,
            items,
            projectOverview,
            projectDetails,
            milestone,
            totalAmount,
        } = req.body;
        let imageUrl =  "/uploads/quotation/" + req.file.filename;

        const quotation = new Quotation({
            quotationNo,
            quotationDate,
            image: imageUrl,
            name,
            company,
            email,
            phone,
            address,
            items,
            projectOverview,
            projectDetails,
            milestone,
            totalAmount,
        });
        await quotation.save();

        res.status(201).json({ success: true, message: "Quotation Created Successfully", data: quotation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getQuotations = async (req, res) => {
    try {

        const quotations = await Quotation.find({});

        if (quotations.length === 0) {
            return res.status(404).json({ success: false, message: "No Quotations Found", data: [] });
        }

        res.status(200).json({ success: true, message: "Quotations Get Successfully", data: quotations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateQuotation = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            email,
            phone,
            company,
            address,
            status,
            source,
            projectName,
            projectType,
            projectBudget,
            projectRequirements,
        } = req.body;

        const lead = await Quotation.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            company,
            address,
            status,
            source,
            projectName,
            projectType,
            projectBudget,
            projectRequirements,
        }, { new: true });

        if (!lead) {
            return res.status(404).json({ success: false, message: "Lead Not Found", data: {} });
        }

        res.status(200).json({ success: true, message: "Lead Updated Successfully", data: lead });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteQuotation = async (req, res) => {
    try {
        const { id } = req.params;
        const quotation = await Quotation.findByIdAndDelete(id);

        if (!quotation) {
            return res.status(404).json({ success: false, message: "Quotation Not Found", data: {} });
        }

        res.status(200).json({ success: true, message: "Quotation Deleted Successfully", data: {} });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};