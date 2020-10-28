const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    const decoded = jwt.verify(token, 'nodens health secret');
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error('You Should authenticate first');
    } else {
      res.locals.user = user;
      next();
    }
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
    next();
  }
};

exports.isAuthenticated = isAuthenticated;
