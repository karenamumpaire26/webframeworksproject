const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  tNumber: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  hash:     { type: String, required: true }
});


userSchema.methods.setPassword = async function (password) {
  const saltRounds = 10;
  this.hash = await bcrypt.hash(password, saltRounds);
};


userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.hash);
};

mongoose.model('User', userSchema);
