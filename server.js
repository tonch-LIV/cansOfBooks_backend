const express = require('express');
const mongoose = require('mongoose');

const Book = require('./models/Book');

require('dotenv').config();

const app = express();

const PORT = 3001;

mongoose.connect(process.env.MONGODB_URI);

app.get('/', (req, res) => {
  res.send('Backend Server Running!');
});

app.get('/books', async (req, res) => {
  const books = await Book.find({});  // finds all book docs; {} = empty / noFilter;
  res.json(books);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});