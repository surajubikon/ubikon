import Milestone from "../models/milestonModel.js"; // Ensure correct import

// Create milestone
export const milestoneCreate = async (req, res) => {
  try {
    const { name, percentage } = req.body;
    const milestone = new Milestone({ name, percentage });
    await milestone.save();
    res.status(201).json(milestone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all milestones
export const milestoneGet = async (req, res) => {
  try {
    const milestones = await Milestone.find();
    res.status(200).json(milestones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single milestone by ID
export const milestoneGetByID = async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id);
    if (!milestone) return res.status(404).json({ message: "Milestone not found" });
    res.status(200).json(milestone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a milestone by ID
export const milestoneUpdate = async (req, res) => {
  try {
    const { name, percentage } = req.body;
    const milestone = await Milestone.findByIdAndUpdate(
      req.params.id,
      { name, percentage },
      { new: true }
    );
    if (!milestone) return res.status(404).json({ message: "Milestone not found" });
    res.status(200).json(milestone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a milestone by ID
export const milestoneDelete = async (req, res) => {
  try {
    const milestone = await Milestone.findByIdAndDelete(req.params.id);
    if (!milestone) return res.status(404).json({ message: "Milestone not found" });
    res.status(200).json({ message: "Milestone deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
