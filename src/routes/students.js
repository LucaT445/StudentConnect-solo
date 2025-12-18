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

// returns total number of students
router.get('/count', async (req, res) => {
    try {
      const count = await Student.countDocuments();
      res.json({count});

    } catch (err) {
      console.error("Error getting student count", err.message);
      res.status(500).json({ error: 'Server error getting student count'});
    }
})

router.get('/by-email/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const student = await Student.findOne({email});

      if (!email) {
        return res.status(400).json({error: 'Email is requitred'})
      }

      if (!student) {
        return res.status(404).json({error: 'Student not found'});
      
      }
      res.json({ student });

    } catch (err) {
      console.error("Error getting student by email", err.message);
      res.status(500).json({ error: 'Server error getting student by email'});
      

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

    if (err.name === 'CastError'){
      console.error('Error updating student:', err.message);
      return res.status(400).json({ message: "Invalid student ID" });

    }
    else if (err.name === 'ValidationError'){
      console.error('Validation error:', err.message);
      return res.status(422).json({message: "Improper data entry."})
    }

    else {
      console.error('Server error:', err.message);
      return res.status(500).json({message: 'There was a problem with the server.'})
    }

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