const { Router } = require('express');
const {
  validatePostAuthLoginController,
  validatePostAuthSignupController,
} = require('../utils/validator');
const {
  postSignupController,
  postLoginController,
  getLogoutController,
} = require('../controllers/auth');

const router = new Router();

router.post(
  '/signup',
  validatePostAuthSignupController(),
  postSignupController
);
router.post('/login', validatePostAuthLoginController(), postLoginController);
router.get('/logout', getLogoutController);

module.exports = router;
