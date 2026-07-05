const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Book = require('./models/Book');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json()); // teaches Express to read incoming request in JSON format

const PORT = 3001;

mongoose.connect(process.env.MONGODB_URI);

app.get('/', (req, res) => {
  res.send('Backend Server Running!');
});

app.get('/books', async (req, res) => {
  const books = await Book.find({});  // finds all book docs; {} = empty / noFilter;
  res.json(books);
});

app.post('/books', async (req, res) => {
  try {
    const newBook = {  // creates object matching Book schema*  
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    };

    const createdBook = await Book.create(newBook);  //saves new entry in MongoDB
    res.status(201).json(createdBook);  // sends saved boot back to client; 201
  } catch (error) {
    res.status(500).json({ message: 'Unable to create book' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});