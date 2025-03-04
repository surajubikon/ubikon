
import express from "express";
import {
  createQuotation,
  getQuotations,
  deleteQuotation
} from "../controllers/quotationController.js";
import { QuotationValidator } from "../middleware/validator.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./public/uploads/quotation");
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);

  }
});

const upload = multer({storage : storage});
const router = express.Router();

router.route("/")
  .post(QuotationValidator, upload.single("image"), createQuotation)
  .get(getQuotations);

// router.route("/states/:countryCode")
//   .get(getStates)

// router.route("/cities/:stateCode/:countryCode")
//   .get(getCities)

router.route("/:id")
  //   .put(LeadValidator, updateLead)
  //   .patch(LeadStatusValidator, updateStatus)
  .delete(deleteQuotation);

export default router;