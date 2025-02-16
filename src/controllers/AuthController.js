const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const AuthController = {
    login: async (req, res) => {
        res.json(200,"message");
    },
    register: async (req, res) => {
        console.log(req.body);
        const {name, email} = req.body;
        const password = await bcrypt.hash(req.body.password, 10);
        const user = new UserModel({name, email, password});
        await user.save();
        return res.status(200).json({
            status: 200,
            data:user,
            message: "Register successfully"
        })
    }
}

module.exports = AuthController