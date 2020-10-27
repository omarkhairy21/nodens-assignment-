const { Router } = require('express');

const {
  postSignupController,
  postLoginController,
} = require('../controllers/auth');

const router = new Router();

router.post('/signup', postSignupController);
router.post('/login', postLoginController);

module.exports = router;
