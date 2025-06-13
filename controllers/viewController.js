const db = require('../config/db');

const getAllViews = (req, res) => {
  console.log("➡️ GET /api/articles called");

  const query = 'SELECT * FROM views'; // Replace with actual table name if different

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ DB Query Failed:", err.message); // <-- See the error
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("✅ DB Query Success:", results);
    res.status(200).json(results);
  });
};

module.exports = { getAllViews };
