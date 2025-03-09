const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],  // Request Google profile and email
  })
);

// Google Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // On success, send the user info and the JWT token
    res.json({
      message: "Google authentication successful!",
      token: req.user.token,
      user: req.user.user,
    });
  }
);

// Regular Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
