const pool = require('../config/db');

// Get all rejected candidates
exports.getRejectedCandidates = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM rejected_candidates ORDER BY id DESC");
    res.status(200).json({ candidates: rows });
  } catch (err) {
    console.error("Error fetching rejected candidates:", err.message);
    res.status(500).send("Server Error");
  }
};
