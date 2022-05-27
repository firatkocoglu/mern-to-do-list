const express = require('express');
const taskRouter = express.Router();
const passport = require('passport');

const {
  getAllTasks,
  createTask,
  deleteTask,
  editTask,
} = require('../controllers/tasks');

const auth = require('../auth/authenticate');

taskRouter
  .route('/')
  .post(auth.authenticate(), createTask)
  .get(auth.authenticate(), getAllTasks);
taskRouter
  .route('/:id')
  .delete(auth.authenticate(), deleteTask)
  .put(auth.authenticate(), editTask);
module.exports = taskRouter;
