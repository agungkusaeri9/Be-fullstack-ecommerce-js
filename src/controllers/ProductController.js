const ProductModel = require("../models/ProductModel");
const path = require("path");
const fs = require("fs");


const ProductController = {
    getAll: async (req, res) => {
        try {
            const products = await ProductModel.find().populate("category");
            return res.status(200).json({
                status: true,
                message: "Get all products successfully",
                data: products
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                message: error.message || "Something went wrong"
            })
        }
    },
    create: async (req, res) => {
        try {

            if (!req.file) {
                return res.status(400).json({ status: false, message: "Image is required" });
            }
            const { name, category, price, qty, description } = req.body;
            
            const product = new ProductModel({
                name,
                category,
                price,
                qty,
                image: req.file.filename,
                description
            });
    
            await product.save();
    
            return res.status(201).json({
                status: true,
                message: "Product created successfully",
                data: product,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message || "Something went wrong",
            });
        }
    },    
    show: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await ProductModel.findById(id).populate("category");
            if (!product) {
                return res.status(404).json({
                    status: false,
                    message: "Product not found"
                })
            }
            return res.status(200).json({
                status: true,
                message: "Get product successfully",
                data: product
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                message: error.message || "Something went wrong"
            })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await ProductModel.findById(id);
            if (!product) {
                return res.status(404).json({ status: false, message: "Product not found" });
            }
            let image = product.image;
    
            if (req.file) {
                const oldImagePath = path.join(__dirname, "../../uploads/", product.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); 
                }
                image = req.file.filename;
            }
            const { name, category, price, qty, description } = req.body;

            product.name = name || product.name;
            product.category = category || product.category;
            product.price = price || product.price;
            product.qty = qty || product.qty;
            product.image = image;
            product.description = description || product.description;
            await product.save();
    
            return res.status(200).json({
                status: true,
                message: "Product updated successfully",
                data: product,
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                message: error.message || "Something went wrong",
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await ProductModel.findById(id);
            if (!product) {
                return res.status(404).json({
                    status: false,
                    message: "Product not found"
                })
            }

            if (product.image) {
                const oldImagePath = path.join(__dirname, "../../uploads/", product.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); 
                }
            }
            await ProductModel.deleteOne();
            return res.status(200).json({
                status: true,
                message: "Product deleted successfully"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                message: error.message || "Something went wrong"
            })
        }
    }
}

module.exports = ProductController;