const express = require('express');

const router = express.Router();

const { isAuthenticated } = require('../middleware/authMiddleware');

const { getUserProfileController } = require('../controllers/user');

router.get('/user/profile', isAuthenticated, getUserProfileController);

module.exports = router;
