const db = require('../config/db');

const getAllPosts = (req, res) => {
  console.log("➡️ GET /api/posts called");

  const query = 'SELECT * FROM post'; // ✅ Ensure this table exists

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching posts:", err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!results.length) {
      console.warn("⚠️ No posts found in table");
      return res.status(404).json({ message: 'No posts found' });
    }

    console.log("✅ Posts fetched:", results.length);
    res.status(200).json(results);
  });
};

module.exports = { getAllPosts };
