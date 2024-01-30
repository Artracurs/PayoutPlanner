const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGO_URL;

mongoose.connect(connectionString)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
