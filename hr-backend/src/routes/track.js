const express = require('express');
const router = express.Router();
const { trackCandidate } = require('../controllers/trackController');

router.get('/', trackCandidate);

module.exports = router;
