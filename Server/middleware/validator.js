import { body, validationResult } from "express-validator";

export const LeadValidator = [
    body("name").trim().notEmpty().withMessage("Name is required").bail(),
    body("email").trim().isEmail().withMessage("Valid email is required").bail(),
    body("phone").trim().isMobilePhone().withMessage("Valid phone number is required").bail(),
    body("company").trim().notEmpty().withMessage("Company is required").bail(),
    body("address").trim().notEmpty().withMessage("Address is required").bail(),
    body("source")
        .trim()
        .notEmpty().withMessage("Source is required")
        .isIn(["Website", "Ads", "Referral", "Cold Call"]).withMessage("Invalid source. Allowed values: Website, Ads, Referral, Cold Call"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array()[0] });
        }
        next();
    },
    body("projectName").trim().notEmpty().withMessage("Project Name is required").bail(),
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
