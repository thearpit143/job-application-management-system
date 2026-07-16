const pool = require('../config/db');

// Track candidate application by email
exports.trackCandidate = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const [approved] = await pool.query(
      "SELECT name FROM approved_candidates WHERE LOWER(email) = LOWER(?)", 
      [email]
    );
    if (approved.length > 0) {
      return res.json({ status: "Approved", name: approved[0].name });
    }

    const [rejected] = await pool.query(
      "SELECT name FROM rejected_candidates WHERE LOWER(email) = LOWER(?)", 
      [email]
    );
    if (rejected.length > 0) {
      return res.json({ status: "Rejected", name: rejected[0].name });
    }

    const [pending] = await pool.query(
      "SELECT name FROM candidates WHERE LOWER(email) = LOWER(?)", 
      [email]
    );
    if (pending.length > 0) {
      return res.json({ status: "Pending", name: pending[0].name });
    }

    res.json({ status: "Not Found" });
  } catch (err) {
    console.error("Error tracking candidate:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
