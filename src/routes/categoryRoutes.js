const express = require("express");
const CategoryController = require("../controllers/CategoryController");
const categoryValidation = require("../validations/categoryValidation");

const router = express.Router();

router.get('/', CategoryController.getAll);
router.post('/', categoryValidation.create, CategoryController.create);
router.get('/:id', categoryValidation.show, CategoryController.show);
router.patch('/:id', categoryValidation.update, CategoryController.update);
router.delete('/:id', categoryValidation.delete, CategoryController.delete);

module.exports = router;