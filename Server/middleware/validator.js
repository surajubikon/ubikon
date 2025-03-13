import { body, validationResult } from "express-validator";

export const LeadValidator = [
    body("name").trim().bail(),
    body("email").trim().bail(),
    body("phone").trim().isMobilePhone().withMessage("Valid phone number is required").bail(),
    body("company").trim().bail(),
    body("address").trim(),
    body("projectName").trim().bail(),
    body("projectType").trim().bail(),
    body("requirements").trim().bail(),
];

export const LeadStatusValidator = [
    body("status")
        .trim()
        .notEmpty().withMessage("Status is required")
        .isIn(["New", "Contacted", "Interested", "Converted", "Not Interested"])
        .withMessage("Invalid status. Allowed values: New, Contacted, Interested, Converted, Not Interested"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array()[0] });
        }
        next();
    }
];

export const QuotationValidator = [
    body("quotationDate").trim().notEmpty().withMessage("Date is required").bail(),
    body("name").trim().bail(),
    body("email").trim().bail(),
    body("phone").trim().isMobilePhone().withMessage("Valid phone number is required").bail(),
    body("address").trim(),
];