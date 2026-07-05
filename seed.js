'use strict';

// =======================
// imports / foundation  |
// ======================

const mongoose = require('mongoose');
require('dotenv').config();

const Book = require('./models/Book');

// ==============
// definitions  |
// =============

async function seedBooks() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Book.deleteMany({}); // deletes existing Book documents

  await Book.create([
    {
      title: "Killers of the Flower Moon",
      description: 'Dive deep in the happenings surrounding the Osage and the brutal murders that took place in 1920s Oklahoma .',
      status: 'Currently reading',
    },
    {
      title: 'Once We Were Brothers',
      description: 'A weaving of past and present into a search for truth',
      status: 'Finished',
    },
    {
      title: 'Guns, Germs, and Steel: The Fates of Human Societies',
      description: 'Ever wonder why things happened in certain regions and to certain societies, author Jared Diamond offers a look at civilizations early days.',
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

  console.log('Books have been added to the DB.');
  await mongoose.disconnect();  // closes / turns of DB connection after seeding; 
}

// =================
// function calls  |
// ================
seedBooks();