const { Router } = require('express');

const {
  postSignupController,
  postLoginController,
  getLogoutController,
} = require('../controllers/auth');

const router = new Router();

router.post('/signup', postSignupController);
router.post('/login', postLoginController);
router.get('/logout', getLogoutController);

module.exports = router;
