const { body } = require('express-validator');

function validatePostAuthSignupController() {
  return [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().not().isEmpty(),
  ];
}
function validatePostAuthLoginController() {
  return [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
  ];
}

module.exports = {
  validatePostAuthSignupController,
  validatePostAuthLoginController,
};
