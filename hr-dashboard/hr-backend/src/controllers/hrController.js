const pool = require('../config/db');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// HR Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM hr_users WHERE username = $1", [username]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const hr = result.rows[0];
    const isMatch = await bcrypt.compare(password, hr.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: hr.id, username: hr.username },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      hr: { id: hr.id, name: hr.name, username: hr.username }
    });

  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
