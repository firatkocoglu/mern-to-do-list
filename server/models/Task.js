const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
