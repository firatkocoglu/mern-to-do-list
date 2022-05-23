const express = require('express');
const taskRouter = express.Router();

const {
  getAllTasks,
  createTask,
  deleteTask,
  editTask,
} = require('../controllers/tasks');

taskRouter.route('/').post(createTask).get(getAllTasks);
taskRouter.route('/:id').delete(deleteTask).put(editTask);
module.exports = taskRouter;
