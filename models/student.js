// server/models/student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  admno: String,
  name: String,
  stbno: String,
  token: Number,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
