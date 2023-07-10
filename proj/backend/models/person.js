const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  designation: String,
  dateOfBirth: Date,
  exp: String,
  profile: { type: String, default: '' }, 
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;

