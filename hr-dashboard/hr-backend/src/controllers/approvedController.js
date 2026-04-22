const pool = require('../config/db');

// Get all approved candidates
exports.getApprovedCandidates = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM approved_candidates ORDER BY id DESC");
    res.status(200).json({ candidates: result.rows });
  } catch (err) {
    console.error("Error fetching approved candidates:", err.message);
    res.status(500).send("Server Error");
  }
};
