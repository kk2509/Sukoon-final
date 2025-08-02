// backend/server.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file
require("dotenv").config(); 
console.log("📦 MONGO_URI from .env:", process.env.MONGO_URI);
// Import routes
const authRoutes = require("./routes/auth"); // Routes for user authentication/profile management
// You will add more route imports here for other data types (blogs, articles, quizzes, etc.)
// const blogRoutes = require("./routes/blog");
// const articleRoutes = require("./routes/article");

const app = express(); // Initialize Express application

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit process with failure if DB connection fails
  });

const PORT = process.env.PORT || 5004; // Use port from .env or default to 5004

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing for all requests
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.originalUrl);
  next();
});

app.use(express.json()); // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", require("./routes/user"));
app.use("/api/contact",require("./routes/contact"));

// --- API Routes ---
// Register your auth routes under the /api/auth path
app.use("/api/auth", authRoutes);

// You will register other routes here as you create them:
// app.use("/api/blogs", blogRoutes);
// app.use("/api/articles", articleRoutes);
// app.use("/api/quizzes", quizRoutes);

// Optional: Basic root route for testing server status
app.get("/", (req, res) => {
  res.send("🎉 Mental Health App Backend API is running!");
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
