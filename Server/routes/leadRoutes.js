
import express from "express";
import {
  createLead,
  getLeads,
  getStates,
  getCities,
  updateLead,
  updateStatus,
  deleteLead
} from "../controllers/leadController.js";
import { LeadValidator, LeadStatusValidator } from "../middleware/validator.js";
import { get } from "mongoose";

const router = express.Router();

router.route("/")
  .post(LeadValidator, createLead)
  .get(getLeads);

router.route("/states/:countryCode")
  .get(getStates)

router.route("/cities/:stateCode/:countryCode")
  .get(getCities)

router.route("/:id")
  .put(LeadValidator, updateLead)
  .patch(LeadStatusValidator, updateStatus)
  .delete(deleteLead);

export default router;