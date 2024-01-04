// server/models/book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bno: String,
  bname: String,
  aname: String,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
