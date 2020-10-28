const mongoose = require('mongoose');
const User = require('../../models/User');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: 'test',
  email: 'test@example.com',
  password: 'test6666',
};

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

module.exports = {
  userOne,
  userOneId,
  setupDatabase,
};
