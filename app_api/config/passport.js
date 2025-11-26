const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');


passport.use(new LocalStrategy(
  { usernameField: 'identifier', passwordField: 'password' },
  async (identifier, password, done) => {
    try {
      
      const user = await User.findOne({
        $or: [
          { email: identifier },
          { tNumber: identifier }
        ]
      }).exec();

      if (!user) {
        return done(null, false, { message: 'Incorrect T Number or Email.' });
      }

      const isValid = await user.validatePassword(password);
      if (!isValid) {
        return done(null, false, { message: 'Invalid password.' });
      }

      return done(null, user);

    } catch (err) {
      return done(err);
    }
  }
));
