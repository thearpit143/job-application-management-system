const pool = require('../config/db');

// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM candidates ORDER BY id DESC");
    res.status(200).json({ candidates: result.rows });
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
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,'Pending', NOW())
      RETURNING *;
    `;

    const values = [
      name, email, phone, linkedin, portfolio, github,
      college, graduation_year, city, job, skills,
      experience, certifications, pitch, resumeBuffer
    ];

    const { rows } = await pool.query(query, values);

    res.status(201).json({ message: 'Candidate submitted!', candidate: rows[0] });
  } catch (error) {
    console.error(error.message);
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Get resume
exports.getResume = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT resume FROM candidates WHERE id = $1", [id]);

    if (!result.rows.length || !result.rows[0].resume) {
      return res.status(404).send("Resume not found");
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.send(result.rows[0].resume);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Approve candidate
exports.approveCandidate = async (req, res) => {
  const { id } = req.params;

  try {
    const candidateResult = await pool.query("SELECT * FROM candidates WHERE id = $1", [id]);
    if (!candidateResult.rows.length) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    const candidate = candidateResult.rows[0];

    const inserted = await pool.query(
      `INSERT INTO approved_candidates
      (name, email, phone, linkedin, portfolio, github, college, graduation_year, city, job, skills, experience, certifications, pitch, resume, apply_date, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,'Approved')
      RETURNING *`,
      [
        candidate.name, candidate.email, candidate.phone, candidate.linkedin,
        candidate.portfolio, candidate.github, candidate.college,
        candidate.graduation_year, candidate.city, candidate.job,
        candidate.skills, candidate.experience, candidate.certifications,
        candidate.pitch, candidate.resume, candidate.apply_date
      ]
    );

    await pool.query("DELETE FROM candidates WHERE id=$1", [id]);
    res.json({ message: "Candidate approved!", candidate: inserted.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Reject candidate
exports.rejectCandidate = async (req, res) => {
  const { id } = req.params;

  try {
    const candidateResult = await pool.query("SELECT * FROM candidates WHERE id = $1", [id]);
    if (!candidateResult.rows.length) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    const candidate = candidateResult.rows[0];

    const inserted = await pool.query(
      `INSERT INTO rejected_candidates
      (name, email, phone, linkedin, portfolio, github, college, graduation_year, city, job, skills, experience, certifications, pitch, resume, apply_date, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,'Rejected')
      RETURNING *`,
      [
        candidate.name, candidate.email, candidate.phone, candidate.linkedin,
        candidate.portfolio, candidate.github, candidate.college,
        candidate.graduation_year, candidate.city, candidate.job,
        candidate.skills, candidate.experience, candidate.certifications,
        candidate.pitch, candidate.resume, candidate.apply_date
      ]
    );

    await pool.query("DELETE FROM candidates WHERE id=$1", [id]);
    res.json({ message: "Candidate rejected!", candidate: inserted.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
