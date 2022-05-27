const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please enter your first name.'],
  },
  username: {
    type: String,
    required: [true, 'Please enter an username.'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password.'],
    min: 6,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
