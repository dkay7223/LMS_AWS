// app.js (entry point)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bookRoutes = require('./routes/bookRoutes');
const studentRoutes = require('./routes/studentRoutes');
const userRoutes = require('./routes/userRoutes');
const authenticateJWT = require('./middleware/authMiddleware')

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://i200760:khadija121@cluster0.4iiibci.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use middleware for all routes except /api/user
app.use((req, res, next) => {
  if (req.path === '/api/user/login' || req.path === '/api/user/register') {
    return next();
  }
  authenticateJWT(req, res, next);
});


// Use routes
app.use('/api/books',  bookRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


