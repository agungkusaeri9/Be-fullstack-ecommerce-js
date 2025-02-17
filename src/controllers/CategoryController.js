const CategoryModel = require("../models/CategoryModel");


const CategoryController = {
    getAll: async (req, res) => {
        try {
            const categories = await CategoryModel.find();
            return res.status(200).json({
                status: true,
                message: "Get all categories successfully",
                data: categories
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
            const { name } = req.body;
            const category = new CategoryModel({ name });
            await category.save();
            return res.status(201).json({
                status: true,
                message: "Category created successfully",
                data: category
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                message: error.message || "Something went wrong"
            })
        }
    },
    show: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await CategoryModel.findById(id);
            if (!category) {
                return res.status(404).json({
                    status: false,
                    message: "Category not found"
                })
            }
            return res.status(200).json({
                status: true,
                message: "Get category successfully",
                data: category
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
            const { name } = req.body;
            const category = await CategoryModel.findById(id);
            if (!category) {
                return res.status(404).json({
                    status: false,
                    message: "Category not found"
                })
            }
            category.name = name;
            await category.save();
            return res.status(200).json({
                status: true,
                message: "Category updated successfully",
                data: category
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                message: error.message || "Something went wrong"
            })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await CategoryModel.findById(id);
            if (!category) {
                return res.status(404).json({
                    status: false,
                    message: "Category not found"
                })
            }
            await CategoryModel.deleteOne();
            return res.status(200).json({
                status: true,
                message: "Category deleted successfully"
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                message: error.message || "Something went wrong"
            })
        }
    }
}

module.exports = CategoryController;