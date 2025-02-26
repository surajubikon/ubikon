import Lead from "../models/leadModel.js";

export const createLead = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            company,
            address,
            interest,
            source,
            projectName,
            projectType,
            budget,
            timeline,
            requirements,
            priority
        } = req.body;

        const lead = new Lead({
            name,
            email,
            phone,
            company,
            address,
            interest,
            source,
            projectName,
            projectType,
            budget,
            timeline,
            requirements,
            priority
        });
        await lead.save();

        res.status(201).json({ success: true, message: "Lead Created Successfully", data: lead });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getLeads = async (req, res) => {
    try {
        const { status, source, page = 1, limit = 10 } = req.query;
        let filter = {};
        if (status) filter.status = status;
        if (source) filter.source = source;

        const leads = await Lead.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        if (leads.length === 0) {
            return res.status(404).json({ success: false, message: "No Leads Found", data: [] });
        }

        res.status(200).json({ success: true, message: "Leads Get Successfully", data: leads });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateLead = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            email,
            phone,
            company,
            address,
            interest,
            status,
            source,
            projectName,
            projectType,
            budget,
            timeline,
            requirements,
            priority
        } = req.body;

        const lead = await Lead.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            company,
            address,
            interest,
            status,
            source,
            projectName,
            projectType,
            budget,
            timeline,
            requirements,
            priority
        }, { new: true });

        if (!lead) {
            return res.status(404).json({ success: false, message: "Lead Not Found", data: {} });
        }

        res.status(200).json({ success: true, message: "Lead Updated Successfully", data: lead });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });

        if (!lead) {
            return res.status(404).json({ success: false, message: "Lead Not Found", data: {} });
        }

        res.status(200).json({ success: true, message: "Lead Status Updated Successfully", data: lead });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLead = async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await Lead.findByIdAndDelete(id);

        if (!lead) {
            return res.status(404).json({ success: false, message: "Lead Not Found", data: {} });
        }

        res.status(200).json({ success: true, message: "Lead Deleted Successfully", data: {} });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};