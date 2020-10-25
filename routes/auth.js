const {Router} = require('express');

const {postSignupController} = require('../controllers/auth');

const router = new Router();

router.post('/signup', postSignupController);

module.exports = router;