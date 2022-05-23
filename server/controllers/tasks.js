const Task = require('../models/Task');
const { StatusCodes } = require('http-status-codes');

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({}).sort('createdAt');
  res.status(StatusCodes.OK).json({ tasks });
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};

const editTask = async (req, res) => {
  const {
    params: { id: taskID },
    body: { task },
  } = req;

  if (task === '') {
    res.json({ err: 'Task field cannot be empty.' });
  }

  const editedTask = await Task.findOneAndUpdate(
    { _id: taskID },
    { task },
    { new: true, runValidators: true }
  );

  if (!editedTask) {
    res.json({ err: `No task found with ID:${taskID}` });
  }

  res.status(StatusCodes.OK).json({ msg: 'Edit successful.', editedTask });
};

const deleteTask = async (req, res) => {
  const {
    params: { id: taskID },
  } = req;
  const deletedTask = await Task.findByIdAndDelete(taskID);

  if (!deletedTask) {
    res.json({ err: `No task found with ID:${taskID}` });
  }

  const tasks = await Task.find({});

  res
    .status(StatusCodes.OK)
    .json({ 'Deleted task: ': deletedTask, 'Remaining Tasks: ': tasks });
};

module.exports = { getAllTasks, createTask, deleteTask, editTask };
