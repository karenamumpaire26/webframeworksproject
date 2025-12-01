const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy(
  { usernameField: 'identifier', passwordField: 'password' },
  async (identifier, password, done) => {

    console.log("LOGIN ATTEMPT");
    console.log("Identifier:", identifier);
    console.log("Password:", password);

    try {
      const user = await User.findOne({
        $or: [
          { email: identifier },
          { tNumber: identifier }
        ]
      });

      console.log("User found:", user);

      if (!user) {
        console.log("No user found with that identifier.");
        return done(null, false, { message: 'Incorrect T Number or Email.' });
      }

      const isValid = await user.validatePassword(password);
      console.log("Password valid:", isValid);

      if (!isValid) {
        console.log("Password invalid.");
        return done(null, false, { message: 'Invalid password.' });
      }

      console.log("Login successful!");
      return done(null, user);

    } catch (err) {
      console.log("ERROR IN PASSPORT:", err);
      return done(err);
    }
  }
));
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

