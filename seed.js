'use strict'

// =======================
// imports / foundation  |
// ======================

const mongoose = require('mongoose');
require('dotenv').config();

const Book = require('./models/Book');

mongoose.connect(process.env.MONGODB_URI);

// ==============
// definitions  |
// =============

async function seedBooks() {
  await Book.create([
    {
      title: "Killers of the Flower Moon",
      description: '',
      status: 'Currently reading',
    },
    {
      title: 'Once We Were Brothers',
      description: 'A weaving of past and present into a search for truth',
      status: 'Finished',
    },
    {
      title: 'Guns, Germs, and Steel: The Fates of Human Societies',
      description: '',
      status: 'Currently reading',
    },
    {
      title: 'El Viento Conoce Mi Nombre',
      description: '',
      status: 'Finished',
    },
    /*{
      title: 'The Black Tulip',
      description: String,
      status: String,
    },
    {
      title: 'The Fifth Mountain',
      description: String,
      status: String,
    },
    {
      title: 'The Silence of the Rain',
      description: String,
      status: String,
    },
    {
      title: 'The Savage Detectives',
      description: String,
      status: String,
    },
    {
      title: 'A Gentleman in Moscow',
      description: String,
      status: String,
    },
    {
      title: 'Steppenwolf',
      description: String,
      status: String,
    },
    {
      title: 'The Gulag Archipelago',
      description: String,
      status: String,
    },
    {
      title: '',
      description: String,
      status: String,
    }, */
  ]);

  console.log('Books have been aded to the DB.');
  mongoose.disconnect();  // closes / turns of DB connection after seeding; 
}

// =================
// function calls  |
// ================
seedBooks();