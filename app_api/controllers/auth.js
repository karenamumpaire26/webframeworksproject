const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

const register = async (req, res) => {
  const { fullName, tNumber, email, password } = req.body;

  if (!fullName || !tNumber || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = new User({ fullName, tNumber, email });
    await user.setPassword(password);
    await user.save();

    // Auto-login after registration (optional)
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Registration succeeded, but login failed.' });
      }
      return res.status(201).json({
        message: 'Registration and login successful',
        user: {
          fullName: user.fullName,
          tNumber: user.tNumber,
          email: user.email
        }
      });
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration error', error: err });
  }
};

const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return res.status(500).json({ message: 'Login error', error: err }); }
    if (!user) { return res.status(401).json(info); }

    req.login(user, (err) => {
      if (err) { return res.status(500).json({ message: 'Login error', error: err }); }

      return res.status(200).json({
        message: 'Login successful',
        user: {
          fullName: user.fullName,
          tNumber: user.tNumber,
          email: user.email
        }
      });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Logged out' });
  });
};

module.exports = { register, login, logout };
