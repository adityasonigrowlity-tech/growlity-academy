const express = require('express');
const router = express.Router();
const { getPublicPlans } = require('../controllers/subscription.controller');

// Public Subscription routes
router.get('/plans', getPublicPlans);

module.exports = router;
