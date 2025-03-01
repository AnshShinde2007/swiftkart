const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();

const JWT_SECRET = "your_secret_key"; // Change this to a secure key

// 📌 Register Route
router.post(
    "/register",
    [
        body("name", "Name is required").notEmpty(),
        body("email", "Valid email is required").isEmail(),
        body("password", "Password must be 6+ chars").isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, isAdmin } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            user = new User({
                name,
                email,
                password: hashedPassword,
                isAdmin: isAdmin || false
            });

            await user.save();

            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, {
                expiresIn: "1h"
            });

            res.status(201).json({ token, user });
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    }
);

// 📌 Login Route
router.post(
    "/login",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password is required").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, {
                expiresIn: "1h"
            });

            res.json({ token, user });
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    }
);

module.exports = router;
