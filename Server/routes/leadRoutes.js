
import express from "express";
import {
  createLead,
  getLeads,
  updateLead,
  updateStatus,
  deleteLead
} from "../controllers/leadController.js";
import { LeadValidator, LeadStatusValidator } from "../middleware/validator.js";

const router = express.Router();

router.route("/")
  .post(LeadValidator, createLead)
  .get(getLeads);

router.route("/:id")
  .put(LeadValidator, updateLead)
  .patch(LeadStatusValidator, updateStatus)
  .delete(deleteLead);

export default router;