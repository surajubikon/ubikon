
import express from "express";
import {
  milestoneCreate,
  milestoneGet,
  milestoneGetByID,
  milestoneUpdate,
  milestoneDelete,
} from "../controllers/milestoneController.js";

const router = express.Router();

router.post("/create", milestoneCreate);
router.get("/get", milestoneGet);
router.get("/:id", milestoneGetByID);
router.put("/update/:id", milestoneUpdate);
router.delete("/delete/:id", milestoneDelete);

export default router;