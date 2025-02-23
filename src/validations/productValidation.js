const { body, validationResult, param } = require("express-validator");
const CategoryModel = require("../models/CategoryModel");
const { default: mongoose } = require("mongoose");
const ProductModel = require("../models/ProductModel");
const multer = require("multer");
const UploadImage = require("../service/UploadImage");

const productValidation = {
    create: [
        body("name").notEmpty().withMessage("Name is required"),
        body("price").notEmpty().withMessage("Price is required").isNumeric().withMessage("Price must be a number"),
        body("qty").notEmpty().withMessage("Quantity is required").isNumeric().withMessage("Quantity must be a number"),
        body("description").notEmpty().withMessage("Description is required"),
        body("category").notEmpty().withMessage("Category is required").isMongoId().withMessage("Invalid category ID"),
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
            .withMessage("ID is required"),
        body("name").notEmpty().withMessage("Name is required"),
        body("price").notEmpty().withMessage("Price is required").isNumeric().withMessage("Price must be a number"),
        body("qty").notEmpty().withMessage("Quantity is required").isNumeric().withMessage("Quantity must be a number"),
        // body("image").notEmpty().withMessage("Image is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("category").notEmpty().withMessage("Category is required").isMongoId().withMessage("Invalid category ID"),
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
            .withMessage("Product ID is required")
            .custom(async (id) => {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error("Invalid Product ID");
                }
                const product = await ProductModel.findById(id);
                if (!product) {
                    throw new Error("Product not found");
                }
            }),
    ],
    delete: [
        param("id")
            .notEmpty()
            .withMessage("ID is required")
            
    ]
};


module.exports = productValidation;
