const express = require("express");
const AuthController = require("../controllers/AuthController");
const authValidation = require("../validations/authValidation");

const router = express.Router();

router.post("/login", authValidation.login, AuthController.login);
router.post("/register", authValidation.register, AuthController.register);

module.exports = router;
