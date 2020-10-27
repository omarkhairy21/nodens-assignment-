const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    const decoded = jwt.verify(token, 'nodens health secret');
    console.log(decoded);
    const user = await User.findById(decoded.userId);
    console.log(user);
    if (!user) {
      throw new Error('Wrong');
    } else {
      res.locals.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

exports.isAuthenticated = isAuthenticated;
