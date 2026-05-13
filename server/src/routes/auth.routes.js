const express = require('express');
const router = express.Router();
const { signup, login, getMe, initialSetup } = require('../controllers/auth.controller');
const { protect } = require('../midlewares/auth.middleware');
const { signupValidator, loginValidator, validate } = require('../validators/auth.validator');

router.post('/signup', signupValidator, validate, signup);
router.post('/login', loginValidator, validate, login);
router.post('/initial-setup', initialSetup);
router.get('/me', protect, getMe);

module.exports = router;
