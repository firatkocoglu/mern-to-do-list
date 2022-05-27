require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 3001;

//User model
require('./models/User');

//Global passport object

//Express parser
app.use(express.json());
app.use(cookieParser());

// Database connection
const connectDB = require('./db/connect');

//Morgan
app.use(morgan('dev'));

//Routers
const taskRouter = require('./routers/tasks');
const authRouter = require('./routers/auth');
const { StatusCodes } = require('http-status-codes');

//Allow CORS
app.use(cors());
app.use(passport.initialize());

//Require passport
require('./auth/authenticate');

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to To Do List Server.' });
});

app.get(
  '/protected',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    res.status(StatusCodes.OK).send({
      success: true,
      user: {
        id: req.user.id,
        username: req.user.username,
      },
    });
  }
);

app.use('/tasks', taskRouter);
app.use('/auth', authRouter);

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
