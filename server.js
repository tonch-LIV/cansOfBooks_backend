console.log('***** SERVER FILE LOADED *****');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Book = require('./models/Book');
const verifyUser = require('./auth/authorize');

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
    console.error('Mongo connection failed;');
    console.error(error);
  });

app.get('/', (req, res) => {
  console.log('GET / received');
  res.send('Backend Server Running! THIS IS THE CORRECT SERVER');
});

app.get('/books', verifyUser, async (req, res) => {
  console.log("GET /books request received");

  try {
    const email = req.user.email;

    const books = await Book.find({ email }); 
    console.log('Books found:', books.length);

    res.json(books);
  } catch(error) {
    console.error("Error retrieving books:", error);

    res.status(500).json({
      message: 'Unable to retrieve books.',
      error: error.message,
    });
  }
});

app.post('/books', verifyUser, async (req, res) => {
  console.log('***** POST ROUTE HIT *****');
  console.log(req.body);
  
  try {
    const { title, description, status } = req.body;  // destructuring object

    const email = req.user.email;

    if (!title || !description || !status) {
      return res.status(400).json({
        message: `Title, description, and status are required.`,
      });
    }

    const newBook = {  // creates object matching Book schema*  
      title,
      description,
      status,
      email,
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

app.delete('/books/:id', verifyUser, async (req, res) => {
  console.log('**** DELETE ROUTE HIT ****');

  try {
    const email = req.user.email;

    const deletedBook = await Book.findOneAndDelete({
      _id: req.params.id,
      email,
    });

    if (!deletedBook) {
      return res.status(404).json({
        message: 'Book not found.',
      });
    }
    
    res.status(200).json({
      message: 'Book deleted successfully.',
      deletedBook,
    });

  } catch (error) {
    console.error('Error deleting book:', error);

    res.status(500).json({
      message: 'Unable to delete book.',
      error: error.message,
    });
  }
});

app.put('/books/:id', verifyUser, async (req, res) => {
  console.log('***** PUT ROUTE HIT *****');

  try {
    const email = req.user.email;

    const updatedBook = await Book.findOneAndUpdate(
      {
        _id: req.params.id,
        email,
      },
      req.body,      
      {
        returnDocument: 'after',  // sends updated doc after updating
      }
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: 'Book not found.',
      });
    }

    res.status(200).json(updatedBook);

  } catch (error) {
    console.error('Error updating book:', error);

    res.status(500).json({
      message: 'Unable to update book.',
      error: error.message,
    });
  }
});
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });