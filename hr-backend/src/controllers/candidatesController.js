const pool = require('../config/db');

// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM candidates ORDER BY id DESC");
    res.status(200).json({ candidates: rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Add a candidate
exports.addCandidate = async (req, res) => {
  try {
    const {
      name, email, phone, linkedin, portfolio, github,
      college, graduation_year, city, job, skills,
      experience, certifications, pitch
    } = req.body;

    const resumeBuffer = req.file ? req.file.buffer : null;

    const query = `
      INSERT INTO candidates
      (name, email, phone, linkedin, portfolio, github, college, graduation_year, city, job, skills, experience, certifications, pitch, resume, status, apply_date)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'Pending', NOW())
    `;

    const values = [
      name, email, phone, linkedin, portfolio, github,
      college, graduation_year, city, job, skills,
      experience, certifications, pitch, resumeBuffer
    ];

    const [insertResult] = await pool.query(query, values);
    const [candidateRows] = await pool.query("SELECT * FROM candidates WHERE id = ?", [insertResult.insertId]);

    res.status(201).json({ message: 'Candidate submitted!', candidate: candidateRows[0] });
  } catch (error) {
    console.error(error.message);
    if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
      return res.status(400).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Get resume
exports.getResume = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT resume FROM candidates WHERE id = ?", [id]);

    if (!rows.length || !rows[0].resume) {
      return res.status(404).send("Resume not found");
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.send(rows[0].resume);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Approve candidate
exports.approveCandidate = async (req, res) => {
  const { id } = req.params;

  try {
    const [candidateRows] = await pool.query("SELECT * FROM candidates WHERE id = ?", [id]);
    if (!candidateRows.length) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    const candidate = candidateRows[0];

    const [insertResult] = await pool.query(
      `INSERT INTO approved_candidates
      (name, email, phone, linkedin, portfolio, github, college, graduation_year, city, job, skills, experience, certifications, pitch, resume, apply_date, status)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'Approved')`,
      [
        candidate.name, candidate.email, candidate.phone, candidate.linkedin,
        candidate.portfolio, candidate.github, candidate.college,
        candidate.graduation_year, candidate.city, candidate.job,
        candidate.skills, candidate.experience, candidate.certifications,
        candidate.pitch, candidate.resume, candidate.apply_date
      ]
    );

    const [approvedRows] = await pool.query("SELECT * FROM approved_candidates WHERE id = ?", [insertResult.insertId]);

    await pool.query("DELETE FROM candidates WHERE id = ?", [id]);
    res.json({ message: "Candidate approved!", candidate: approvedRows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Reject candidate
exports.rejectCandidate = async (req, res) => {
  const { id } = req.params;

  try {
    const [candidateRows] = await pool.query("SELECT * FROM candidates WHERE id = ?", [id]);
    if (!candidateRows.length) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    const candidate = candidateRows[0];

    const [insertResult] = await pool.query(
      `INSERT INTO rejected_candidates
      (name, email, phone, linkedin, portfolio, github, college, graduation_year, city, job, skills, experience, certifications, pitch, resume, apply_date, status)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'Rejected')`,
      [
        candidate.name, candidate.email, candidate.phone, candidate.linkedin,
        candidate.portfolio, candidate.github, candidate.college,
        candidate.graduation_year, candidate.city, candidate.job,
        candidate.skills, candidate.experience, candidate.certifications,
        candidate.pitch, candidate.resume, candidate.apply_date
      ]
    );

    const [rejectedRows] = await pool.query("SELECT * FROM rejected_candidates WHERE id = ?", [insertResult.insertId]);

    await pool.query("DELETE FROM candidates WHERE id = ?", [id]);
    res.json({ message: "Candidate rejected!", candidate: rejectedRows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
