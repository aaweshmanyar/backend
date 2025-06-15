const db = require('../config/db');

const getAllPosts = async (req, res) => {
  console.log("➡️ GET /api/posts called");

  try {
    const [results] = await db.query('SELECT * FROM post');

    if (!results.length) {
      console.warn("⚠️ No posts found in table");
      return res.status(404).json({ message: 'No posts found' });
    }

    console.log("✅ Posts fetched:", results.length);
    res.status(200).json(results);

  } catch (err) {
    console.error("❌ Error fetching posts:", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllPosts };
