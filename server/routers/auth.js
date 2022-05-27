const express = require('express');
const authRouter = express.Router();
const passport = require('passport');

const { login, signup, logout } = require('../controllers/auth');

authRouter.route('/login').post(login);

authRouter.route('/signup').post(signup);

authRouter.route('/logout').get(logout);

module.exports = authRouter;
