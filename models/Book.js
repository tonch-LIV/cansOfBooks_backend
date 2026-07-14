
// imports Mongoose; able to use schemas and models
const mongoose = require('mongoose');

// template / blueprint
const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});

// creates model; 
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;