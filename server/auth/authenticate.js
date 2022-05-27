const User = require('../models/User');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new JwtStrategy(options, (payload, done) => {
    const { expiration } = payload;

    if (Date.now() > expiration) {
      done('Unauthorized', false);
    }

    done(null, payload);
  })
);

exports.authenticate = () => {
  return passport.authenticate('jwt', { session: false });
};
