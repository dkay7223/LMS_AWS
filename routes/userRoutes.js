const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authMiddleware')



// Register a new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login',userController.loginUser);
router.get('/:id/role', authenticateJWT, userController.getUserRole); 

module.exports = router;
