const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// --------------------
// REGISTER (email + password)
// --------------------
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log("Registering:", email);

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// --------------------
// LOGIN (email + password)
// --------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Logging in:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    if (!user.password) {
      return res.status(400).json({ message: "Account uses Google login. Use Google Sign-In." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// --------------------
// GOOGLE LOGIN
// --------------------
router.post("/google-login", async (req, res) => {
  const { name, email, uid } = req.body;
  console.log("Google Sign-In:", email);

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, uid });
      await user.save();
      console.log("New Google user saved.");
    } else {
      console.log("Existing Google user.");
    }

    res.status(200).json({ message: "User logged in with Google", user });
  } catch (err) {
    console.error("Google login failed:", err.message);
    res.status(500).json({ message: "Google login failed", error: err.message });
  }
});

module.exports = router;
