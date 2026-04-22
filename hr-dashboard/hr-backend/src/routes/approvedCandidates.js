const express = require('express');
const router = express.Router();
const { getApprovedCandidates } = require('../controllers/approvedController');

router.get('/', getApprovedCandidates);

module.exports = router;
