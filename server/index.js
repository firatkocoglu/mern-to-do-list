const dotenv = require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

// Database connection
const connectDB = require('./db/connect');

//Routers
const taskRouter = require('./routers/tasks');
const authRouter = require('./routers/auth');

//Express parser
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to To Do List Server.' });
});

app.use('/auth', authRouter);
app.use('/tasks', taskRouter);

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
