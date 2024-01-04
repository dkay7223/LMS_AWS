const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  userType: { type: String, enum: ['admin', 'student'], default: 'student' },
});

module.exports = mongoose.model('User', userSchema);
