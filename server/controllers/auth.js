const { StatusCodes } = require('http-status-codes');
const { hashSync, compareSync } = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const user = await User.create({
    firstname: req.body.firstname,
    username: req.body.username,
    password: hashSync(req.body.password, 10),
  });
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, user: { id: user._id, username: user.username } });
};

const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  //If the user cannot be found
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: 'Could not found the user.' });
  }

  //If the user types a wrong password
  if (!compareSync(req.body.password, user.password)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: 'Invalid username or password' });
  }

  //Successful login attempts
  const payload = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30d' });
  return res
    .status(StatusCodes.OK)
    .cookie('jwt', token, {
      expires: new Date(Date.now() + 24 * 3600000 * 30),
    })
    .json({ success: true, message: 'Logged in successfuly.', token });
};

const logout = async (req, res) => {
  return res
    .status(StatusCodes.OK)
    .clearCookie('jwt')
    .json({ success: true, message: 'Logged out successfuly.' });
};

module.exports = { login, signup, logout };
