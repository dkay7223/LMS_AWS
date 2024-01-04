// server/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    // Ensure that the 'token' field is included in the response
    const studentsWithToken = students.map(student => ({
      _id: student._id,
      admno: student.admno,
      name: student.name,
      token: student.token || 0,  // Set a default value if 'token' is missing
    }));
    res.json(studentsWithToken);
  } catch (error) {
    res.json({ message: error.message });
  }
});


// Get a specific student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Create a new student
router.post('/', async (req, res) => {
  const { admno, name, token } = req.body;

  const student = new Student({
    admno,
    name,
    token: token || 0, // Set a default value if 'token' is missing
  });

  try {
    const savedStudent = await student.save();
    console.log('Saved student:', savedStudent); // Log the saved student
    res.json(savedStudent);
  } catch (error) {
    res.json({ message: error.message });
  }
});


// Update a student by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndRemove(req.params.id);
    res.json(deletedStudent);
  } catch (error) {
    res.json({ message: error.message });
  }
});



module.exports = router;
