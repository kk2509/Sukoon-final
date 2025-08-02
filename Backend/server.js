// backend/server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

console.log("📦 MONGO_URI from .env:", process.env.MONGO_URI);

const app = express();

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

// --- CORS ---
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sukoon-frontend-2a6q.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  })
);

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.originalUrl);
  next();
});

// --- Routes ---
app.use("/api/users", require("./routes/user"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/auth", require("./routes/auth"));

// --- Basic root route ---
app.get("/", (req, res) => {
  res.send("🎉 Mental Health App Backend API is running!");
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
