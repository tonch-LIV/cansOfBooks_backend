const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const PORT = 3001;

mongoose.connect(process.env.MONGODB_URI);

app.get('/', (req, res) => {
  res.send('Backend Server Running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});