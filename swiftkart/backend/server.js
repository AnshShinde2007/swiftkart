const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productroutes");
const userRoutes = require("./routes/userproduct");
const orderRoutes = require("./routes/orderroutes");
const adminRoutes = require("./routes/adminroutes"); // ✅ add this

const app = express();
app.use(express.json());

// Enable CORS for local dev and Netlify deployment
app.use(
  cors({
    origin: ["https://swiftkaart.netlify.app", "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes); // ✅ add this line
// ImageKit auth lives under products router at /api/products/imagekit/auth

// Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
