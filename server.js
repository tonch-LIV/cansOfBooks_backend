console.log('***** SERVER FILE LOADED *****');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Book = require('./models/Book');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json()); // teaches Express to read incoming request in JSON format

const PORT = 3001;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Mongo connected!');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

app.get('/', (req, res) => {
  res.send('Backend Server Running! THIS IS THE CORRECT SERVER');
});

app.get('/books', async (req, res) => {
  console.log("GET /books request received");

  try {
    const books = await Book.find({});  // finds all book docs; {} = empty / noFilter;
    res.json(books);
  } catch(error) {
    console.error("Error retrieving books:", error);

    res.status(500).json({
      message: 'Unable to retrieve books.',
      error: error.message,
    });
  }
});

app.post('/books', async (req, res) => {
  console.log('***** POST ROUTE HIT *****');
  console.log(req.body);
  
  try {
    const { title, description, status } = req.body;  // destructuring object

    if (!title || !description || !status) {
      return res.status(400).json({
        message: `Title, description, and status are required.`,
      });
    }

    const newBook = {  // creates object matching Book schema*  
      title,
      description,
      status,
    };

    const createdBook = await Book.create(newBook);  //saves new entry in MongoDB
    res.status(201).json(createdBook);  // sends saved boot back to client; 201
  } catch (error) {
    console.error("Error creating book:", error);

    res.status(500).json({ 
      message: 'Unable to create book',
      error: error.message,
    });
  }
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });