//Sign In -> user put the credentials -> look for existing user -> if user access to ->
// tell them email already taken -> if not -> create a new user in MongoDB -> send back a jwt token 

const express = require("express");
const router = express.Router();
const User = require("../schemas/user.schema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();


router.post("/signup", async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            res.status(400).json({ message: "Email already taken" });
            return
        }
        else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = await new User({ name, phone, email, password: hashedPassword }).save();
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            return res.status(200).json({ message: "User created successfully", token, id: newUser._id });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid email or password" });
            return
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return res.status(200).json({ message: "Login successful", token, id: user._id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;