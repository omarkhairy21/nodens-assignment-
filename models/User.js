const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

/**
 * @deprecated hook helper function before store password hash and generate salt to it
 */
UserSchema.pre('save', async function(next){

  try{
    // generate salt
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
  }
  catch(error){
    console.log(error)
    throw next(error)
  }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
