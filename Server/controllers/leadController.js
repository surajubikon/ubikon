import { State, City } from "country-state-city";
import Lead from "../models/leadModel.js";

export const createLead = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            company,
            address,
            state,
            city,
            source,
            projectName,
            projectType,
            projectBudget,
            projectRequirements,
        } = req.body;

        const lead = new Lead({
            name,
            email,
            phone,
            company,
            address,
            state,
            city,
            source,
            projectName,
            projectType,
            projectBudget,
            projectRequirements,
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

export const getStates = async (req, res) => {
    try {
        const stateList = await (State.getStatesOfCountry(req.params.countryCode));

        res.status(200).json({ success: true, message: "States Get Successfully", data: stateList });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCities = async (req, res) => {
    try {
        const cityList = await (City.getCitiesOfState(req.params.countryCode, req.params.stateCode));

        res.status(200).json({ success: true, message: "Cities Get Successfully", data: cityList });
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
            state,
            city,
            status,
            source,
            projectName,
            projectType,
            projectBudget,
            projectRequirements,
        } = req.body;

        const lead = await Lead.findByIdAndUpdate(id, {
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