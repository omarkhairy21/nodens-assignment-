const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * @deprecated hook helper function before store password hash and generate salt to it
 */

UserSchema.pre('save', async function (next) {
  try {
    // generate salt
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(error);
    throw next(error);
  }
});

/**
 * @description static function to find the user and compare password
 * @param {string} email
 * @param {string} password
 */
UserSchema.statics.login = async function (email, password) {
  try {
    // find the user by email
    const user = await User.findOne({ email });
    // throw error if is not exists
    if (!user) throw new Error('Can Not find User with this email');
    // compare the provided password with the password store in Database
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    // throw error if the provided password incorrect
    if (!isPasswordMatched)
      throw new Error('Unable to Login, incorrect password');
    // return the user
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
