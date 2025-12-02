const express = require('express');
const Student = require('../models/student');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const students = await Student.find({});
        res.json({ students });
    } catch (err) {
        console.error('Error fetching students:', err.message );
        res.status(500).json({ error: 'Server error fetching students'});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const studentDoc = await Student.findById(id);
        
        if (!studentDoc){
            return res.status(404).json({error: 'Student not found'});
        }

        res.json({ student: studentDoc});



    } catch (err) {
        console.error('Error getting student by ID', err.message);
        res.status(500).json({ error: 'Server error getting student'});
    }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student deleted', student: deletedStudent });
  } catch (err) {
    console.error('Error deleting student:', err.message);
    res.status(500).json({ error: 'Server error deleting student' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, cohort } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, email, cohort },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ student: updatedStudent });
  } catch (err) {
    console.error('Error updating student:', err.message);
    res.status(400).json({ message: err.message });
  }
});




router.post('/', async (req, res) => {
    try {
        const {name, email, cohort} = req.body;

        if (!name || !email|| !cohort){
            return res.status(400).json({error: "name, email, and cohort are required"});
        }

        const student = await Student.create({name, email, cohort});

        res.status(201).json({student});
    } catch (err){
        console.error("Student creation failed:", err.message);
        res.status(500).json({error: "Server error creating student"});
    
    }
});

module.exports = router;