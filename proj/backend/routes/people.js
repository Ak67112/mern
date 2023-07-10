const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const User = require('../models/user');
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");



// Create a new person
router.post('/', async (req, res) => {
    try {
      const person = new Person(req.body);
      person.profile = req.file.path; 
      await person.save();
      res.status(201).json(person);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create a new person' });
    }
  });
  

// Get all people
router.get('/', async (req, res) => {
    try {
      const people = await Person.find();
      res.status(200).json(people);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch people' });
    }
  });
  
  // Get a specific person
  router.get('/:id', async (req, res) => {
    try {
      const person = await Person.findById(req.params.id);
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.status(200).json(person);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch person' });
    }
  });

  // Delete a person and remove the associated image file
router.delete('/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    // Remove the associated image file
    if (person.profile) {
      fs.unlink(person.profile, (error) => {
        if (error) {
          console.error('Failed to delete image file:', error);
        }
      });
    }

    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete person' });
  }
});

//multer storage
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const fileName = `${uuidv4()}${ext}`;
      cb(null, fileName);
    },
  });
  
  // Set up multer upload
  const upload = multer({ storage: storage });
  
  router.put('/:id', upload.single('profile'), async (req, res) => {
    try {
      const person = await Person.findById(req.params.id);
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      person.name = req.body.name;
      person.designation = req.body.designation;
      person.dateOfBirth = req.body.dateOfBirth;
      person.exp = req.body.exp;
  
      if (req.file) {
        person.profile = req.file.path; // Update the profile picture path
      }
  
      await person.save();
      res.status(200).json(person);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update person' });
    }
  });


router.post('/', upload.single('profile'), async (req, res) => {
    try {
      const person = new Person(req.body);
      person.profile = req.file.path; // Store the complete image path
      await person.save();
      res.status(201).json(person);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create a new person' });
    }
  });

  

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const user = new User({
      name,
      email,  
      password,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email and password match an existing user in the database
    const user = await User.findOne({ email, password });

    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login' });
  }
});
  

module.exports = router;
