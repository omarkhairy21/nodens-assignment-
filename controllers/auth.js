const User = require('../models/User');
const { createJWtToken } = require('../utils/token');

/**
 * @description POST /signup to register new user
 * @requires Body fields Email, Name, Password, confirm password
 */

const maxAge = 14 * 24 * 60 * 60 * 1000; // two weeks

exports.postSignupController = async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    // check first if the user already exist
    const findUser = await User.findOne({ email });
    // send error message if the user exist
    if (findUser) {
      return res
        .status(409)
        .json({ errors: 'The user with this email already exists' });
    }
    // create new user
    const newUser = await User.create({ email, password, name });

    const token = createJWtToken(newUser._id);

    res.cookie('jwt', token, { httpOnly: true, maxAge });

    res.status(201).json({
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

/**
 * @description POST /login to login the user
 * @requires Body fields Email and Password
 */

exports.postLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createJWtToken(user._id);

    res.cookie('jwt', token, { httpOnly: true, maxAge });

    res.status(200).json({
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    console.log(error);
  }
};
