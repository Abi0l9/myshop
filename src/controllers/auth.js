const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const loginUser = async (req, res) => {
    const { input, password } = req.body;

    try {
        const usernameExists = await User.findOne({ username: input });
        const emailExists = await User.findOne({ email: input });

        const dataExists = usernameExists || emailExists

        if (!dataExists) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        

        const userPasswordHash = dataExists.passwordHash;

        const isCorrect =
            bcrypt.compareSync(password, userPasswordHash) || null;

        if (!isCorrect) {
            return res.status(401).json({
                success: false,
                message: "Email/Password is incorrect"
            });
        }

        const payload = {
            id: dataExists.id,
            username: dataExists.username,
            email: dataExists.email
        };
        const token = jwt.sign(payload, config.SECRET);

        return res
            .status(200)
            .json({ success: true, message: "Logged in successfully", token });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const usernameExists = await User.findOne({ username });
        const emailExists = await User.findOne({ email });

        if (usernameExists || emailExists) {
            return res.status(401).json({
                success: false,
                message: "Account with same username/email already exists"
            });
        }
        const saltRounds = bcrypt.genSaltSync(10);

        const passwordHash = bcrypt.hashSync(password, saltRounds);

        const userData = { username, email, passwordHash };
        const newUser = new User(userData);

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "Account created, successfully."
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    loginUser,
    registerUser
};
