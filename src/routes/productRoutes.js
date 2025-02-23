const express = require("express");
const ProductController = require("../controllers/ProductController");
const productValidation = require("../validations/productValidation");
const UploadImage = require("../service/UploadImage");

const router = express.Router();

router.get('/', ProductController.getAll);
router.post('/', UploadImage.single("image"), productValidation.create,  ProductController.create);
router.get('/:id', productValidation.show, ProductController.show);
router.patch('/:id',UploadImage.single("image"), productValidation.update, ProductController.update);
router.delete('/:id', productValidation.delete, ProductController.delete);

module.exports = router;