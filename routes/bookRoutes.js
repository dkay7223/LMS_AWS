// server/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middleware/authMiddleware')

// Search for a book by name
router.get('/search', authenticateJWT , async (req, res) => {
  console.log('Search route executed!');
  const { bookName } = req.query;

  try {
    // Use Mongoose's findOne method to search by the 'bname' field
    const foundBook = await Book.findOne({ bname: new RegExp(bookName, 'i') });

    if (!foundBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(foundBook);
  } catch (error) {
    console.error('Error searching for the book:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Issue a book
router.post('/issue', async (req, res) => {
  const { bookId, userName, userType } = req.body;

  try {
    // Implement the logic to issue a book here
    // This might involve updating the book's status, creating a new record, etc.

    // Respond with a success message or relevant information
    res.status(200).json({ message: 'Book issued successfully' });
  } catch (error) {
    console.error('Error issuing the book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/return', async (req, res) => {
  const { bookId } = req.body;

  try {
    // Implement the logic to handle the return of the book
    // This could involve updating the book status, recording return date, etc.
    // For now, let's assume the book is returned successfully
    const returnedBook = await Book.findById(bookId);
    res.json(returnedBook);
  } catch (error) {
    console.error(`Error returning the book with ID ${bookId}:`, error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Get a specific book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Create a new book
router.post('/', async (req, res) => {
  const book = new Book({
    bno: req.body.bno,
    bname: req.body.bname,
    aname: req.body.aname,
  });

  try {
    const savedBook = await book.save();
    res.json(savedBook);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Update a book by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        bname: req.body.bname,
        aname: req.body.aname,
      },
      { new: true }
    );
    res.json(updatedBook);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    res.json(deletedBook);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
