// backend/routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @route   POST /api/users
// @desc    Save user from Google login
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, photoURL, uid } = req.body;

    // Basic validation
    if (!name || !email || !uid) {
      return res.status(400).json({ error: "Missing required user fields" });
    }

    console.log("📩 Incoming user data:", req.body);

    // Check if user already exists
    let existingUser = await User.findOne({ uid });

    if (existingUser) {
      console.log("✅ User already exists:", existingUser.email);
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    // Create and save new user
    const newUser = new User({ name, email, photoURL, uid });
    await newUser.save();

    console.log("🎉 New user saved:", newUser.email);
    res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (error) {
    console.error("❌ Error saving user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
