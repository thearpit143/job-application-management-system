const express = require('express');
const router = express.Router();
const { getRejectedCandidates } = require('../controllers/rejectedController');

router.get('/', getRejectedCandidates);

module.exports = router;
