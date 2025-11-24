const mongoose = require('mongoose');
const User = mongoose.model('User');

const register = (req, res) => {
  const { fullName, tNumber, email, password } = req.body;

  if (!fullName || !tNumber || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  User.create({ fullName, tNumber, email, password })
    .then(user => {
      res.status(201).json({
        message: "Registration successful",
        user
      });
    })
    .catch(err => {
      res.status(400).json({
        message: "Registration failed",
        error: err
      });
    });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        fullName: user.fullName,
        tNumber: user.tNumber,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Login error", error: err });
  }
};

module.exports = { register,login };
