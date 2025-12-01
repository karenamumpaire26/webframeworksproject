const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

const register = async (req, res) => {
  const { fullName, tNumber, email, password } = req.body;

  console.log("Incoming registration body:", req.body);

  if (!fullName || !tNumber || !email || !password) {
    console.log("Missing fields");
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    console.log(" Creating user object…");
    const user = new User({ fullName, tNumber, email });

    console.log(" Hashing password…");
    await user.setPassword(password);

    console.log("Saving user to database…");
    await user.save();

    console.log("User saved successfully");

    req.login(user, (err) => {
      if (err) {
        console.log("Auto login failed:", err);
        return res.status(500).json({ message: 'Registration succeeded.Got to login now' });
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
    console.error("REGISTRATION ERROR:", err);
    res.status(500).json({ message: 'Registration error', error: err });
  }
};


const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {

    if (err) {
      console.log(" API Login error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (!user) {
      
      return res.status(401).json(info);
    }

    
    req.login(user, (err) => {
      if (err) {
        console.log("Error saving session:", err);
        return res.status(500).json({ message: "Login failed" });
      }

      
      return res.status(200).json({
        message: "Login successful",
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
