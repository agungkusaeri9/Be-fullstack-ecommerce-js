const { body, validationResult } = require("express-validator");
const UserModel = require("../models/UserModel");

const authValidation = {
    login: {
        body: {
            email: { type: 'email', required: true },
            password: { type: 'string', required: true },
        },
    },
    register: [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format")
        .custom(async (email) => {
            const user = await UserModel.findOne({ email });
            if (user) {
                throw new Error("Email already exists");
            }
        }),
        body("password")
          .isLength({ min: 6 })
          .withMessage("Password must be at least 6 characters long"),
    
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
}

module.exports = authValidation