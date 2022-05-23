const dotenv = require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

// Database connection
const connectDB = require('./db/connect');

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to To Do List Server.' });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(
        `Connected to database, server is listening on port ${PORT}.`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
