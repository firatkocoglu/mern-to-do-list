const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, 'No tasks typed!'],
      maxlength: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
