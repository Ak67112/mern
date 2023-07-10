const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Project')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

app.use(bodyParser.json());
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads', 'images')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Set up API routes
const peopleRoutes = require('./routes/people');
app.use('/api/people', upload.single('profile'), peopleRoutes);
app.use('/api/user', peopleRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
