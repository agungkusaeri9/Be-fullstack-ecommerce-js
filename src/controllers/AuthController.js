const AuthService = require("../service/AuthService");
const bcrypt = require("bcrypt");

const AuthController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await AuthService.login({ email, password });

      return res.status(200).json({
        status: true,
        message: "Login successfully",
        data: user,
      });
    } catch (error) {
      return res.status(error.status || 400).json({
        status: false,
        message: error.message || "Something went wrong",
      });
    }
  },

  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await AuthService.register({
        name,
        email,
        password: hashedPassword,
      });
      return res.status(201).json({
        status: true,
        message: "Register successfully",
        data: { user, token },
      });
    } catch (error) {
      return res.status(error.status || 400).json({
        status: false,
        message: error.message || "Something went wrong",
      });
    }
  },
};

module.exports = AuthController;
