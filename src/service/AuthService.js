const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const AuthService = {
  findUserByEmail: async (email) => {
    return await UserModel.findOne({ email });
  },

  login: async (data) => {
    try {
      const user = await AuthService.findUserByEmail(data.email);
      if (!user)
        throw { status: 400, message: "Email or password is incorrect" };
      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
      );
      if (!isPasswordValid)
        throw { status: 400, message: "Email or password is incorrect" };

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return { user, token, expiresIn: process.env.JWT_EXPIRES_IN };
    } catch (error) {
      throw error;
    }
  },

  register: async (data) => {
    try {
      const existingUser = await AuthService.findUserByEmail(data.email);
      if (existingUser) throw { status: 400, message: "Email already exists" };

      const user = new UserModel(data);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = AuthService;
