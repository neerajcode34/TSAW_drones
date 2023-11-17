// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  username: String,
  email: String, // Add this line for the email field
  password: String,
});

// Method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
  };
  

const User = mongoose.model('User', userSchema);

module.exports = User;
