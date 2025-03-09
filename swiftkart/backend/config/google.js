const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId, // Replace with your Google Client ID
      clientSecret: googleClientSecret, // Replace with your Google Client Secret
      callbackURL: "http://localhost:5000/api/auth/google/callback", // Replace with your callback URL
    },
    async (token, tokenSecret, profile, done) => {
      try {
        // Check if the user exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // Create a new user if not exists
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            isAdmin: false, // default value, modify if required
          });
          await user.save();
        }

        // Create a JWT token for the authenticated user
        const jwtToken = jwt.sign({ userId: user._id }, "your_secret_key", {
          expiresIn: "1h",
        });

        done(null, { user, token: jwtToken });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
