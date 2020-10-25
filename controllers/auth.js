const User = require('../models/User');
const { createJWtToken } = require('../utils/token');

/**
 * @description POST /signup to register new user
 * @requires Body fields Email, Name, Password, confirm password 
 */

exports.postSignupController = async (req, res, next) => {

  const {email, name, password } = req.body;

  try {
    // check first if the user already exist
    const findUser = await User.findOne({email})
    // send error message if the user exist
    if(findUser) return res.status(409).json({Error: 'The user with this email already exists'})
    // create new user
    const newUser = await User.create({email, password, name});
    
    const token = createJWtToken(newUser._id);

    const maxAge = 14 * 24 * 60 * 60 * 1000 // two weeks
    res.cookie('jwt', token, { httpOnly: true, maxAge});

    res.status(201).json({user: newUser._id})

  } catch(error){
    console.log(error)
    res.status(400).json({error})
  }

}