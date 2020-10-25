const jwt = require('jsonwebtoken');

/**
 * @description Helper function to create JWT Token
 * @param userId
 */
exports.createJWtToken = (userId) => {
  return jwt.sign({userId}, 'nodens health secret', {
    expiresIn: 2 * 24 * 60 * 60 // expires in two days
  })
}