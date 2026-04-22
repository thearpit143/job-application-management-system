const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/candidates', require('./src/routes/candidates'));
app.use('/api/approved_candidates', require('./src/routes/approvedCandidates'));
app.use('/api/rejected_candidates', require('./src/routes/rejectedCandidates'));
app.use('/api/track', require('./src/routes/track'));
app.use('/api/hr', require('./src/routes/hr'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
