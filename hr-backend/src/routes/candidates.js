const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const {
  getCandidates,
  addCandidate,
  getResume,
  approveCandidate,
  rejectCandidate
} = require('../controllers/candidatesController');

router.get('/', getCandidates);
router.post('/', upload.single('resume'), addCandidate);
router.get('/:id/resume', getResume);
router.post('/:id/approve', approveCandidate);
router.post('/:id/reject', rejectCandidate);

module.exports = router;
