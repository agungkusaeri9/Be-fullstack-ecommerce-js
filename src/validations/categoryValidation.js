const { body, validationResult, param } = require("express-validator");
const CategoryModel = require("../models/CategoryModel");
const { default: mongoose } = require("mongoose");

const categoryValidation = {
    create: [
        body("name").notEmpty().withMessage("Name is required")
            .custom(async (name) => {
                const category = await CategoryModel.findOne({ name });
                if (category) {
                    throw new Error("Category already exists");
                }
            }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: false,
                    message: "Validation failed",
                    errors: errors.array(),
                });
            }
            next();
        },
    ],
    update: [
        param("id")
            .notEmpty()
            .withMessage("Category ID is required")
            .custom(async (id) => {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error("Invalid category ID");
                }
                const category = await CategoryModel.findById(id);
                if (!category) {
                    throw new Error("Category not found");
                }
            }),
        body("name").notEmpty().withMessage("Name is required")
            .custom(async (name, { req }) => {
                const category = await CategoryModel.findOne({ name });
                if (category && category._id.toString() !== req.params.id) {
                    throw new Error("Category already exists");
                }
            }),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: false,
                    message: "Validation failed",
                    errors: errors.array(),
                });
            }
            next();
        },
    ],
    show: [
        param("id")
            .notEmpty()
            .withMessage("Category ID is required")
            .custom(async (id) => {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error("Invalid category ID");
                }
                const category = await CategoryModel.findById(id);
                if (!category) {
                    throw new Error("Category not found");
                }
            }),
    ],
    delete: [
        param("id")
            .notEmpty()
            .withMessage("Category ID is required")
            .custom(async (id) => {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error("Invalid category ID");
                }
                const category = await CategoryModel.findById(id);
                if (!category) {
                    throw new Error("Category not found");
                }
            }),
    ]
};


module.exports = categoryValidation;
