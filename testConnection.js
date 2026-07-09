require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ Connected successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed');
    console.error(error);
    process.exit(1);
  }
}

testConnection();