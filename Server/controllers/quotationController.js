import Quotation from "../models/quotationModel.js";

export const createQuotation = async (req, res) => {
    try {
        const {
            quotationNo,
            quotationDate,
            lead,
            name,
            company,
            email,
            phone,
            address,
            state,
            city,
            items,
            projectOverview,
            projectDetails,
            milestone,
            totalAmount,
        } = req.body;

        let imageUrl
        if (req.file) {
            imageUrl = "/uploads/quotation/" + req.file.filename;
        } else {
            imageUrl = "";
        }

        const quotation = new Quotation({
            quotationNo,
            quotationDate,
            image: imageUrl,
            lead,
            name,
            company,
            email,
            phone,
            address,
            state,
            city,
            items,
            projectOverview,
            projectDetails,
            milestone: JSON.parse(milestone),
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

        const lastQuotationNo = await Quotation.findOne().sort({ quotationNo: -1 }).limit(1);
        const nextQuotationNo = lastQuotationNo ? lastQuotationNo.quotationNo + 1 : 2001;

        if (quotations.length === 0) {
            return res.status(404).json({ success: false, message: "No Quotations Found", data: [] });
        }

        res.status(200).json({ success: true, message: "Quotations Get Successfully", data: quotations, nextQuotationNo: nextQuotationNo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const genrateQuotation = async (req, res) => {
    try {
        const { quotationId } = req.params;
        const quotationData = await Quotation.findById(quotationId);

        if (!quotationData) {
            return res.status(404).json({ success: false, message: "No Quotation Found", data: [] });
        }

        res.status(200).json({ success: true, message: "Quotation Get Successfully", data: quotationData });
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
            state,
            city,
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
            state,
            city,
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