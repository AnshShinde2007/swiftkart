const express = require("express");
const { verifyAdmin } = require("../middleware/authmiddlewar");
const router = express.Router();

// Protect admin routes
router.get("/admin", verifyAdmin, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard!" });
});

module.exports = router;
