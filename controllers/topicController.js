const db = require('../config/db');

const getAllTopic = (req, res) => {
  console.log("➡️ GET /api/articles called");

  const query = 'SELECT * FROM topic'; // ✅ Ensure this is your actual table

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching articles:", err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!results.length) {
      console.warn("⚠️ No articles found in table");
      return res.status(404).json({ message: 'No articles found' });
    }

    console.log("✅ Articles fetched:", results.length);
    res.status(200).json(results);
  });
};

module.exports = { getAllTopic };
