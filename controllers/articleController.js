const db = require('../config/db');

const getAllArticles = async (req, res) => {
  console.log("➡️ GET /api/articles called");

  try {
    const [results] = await db.query('SELECT * FROM articles');

    if (!results.length) {
      console.warn("⚠️ No articles found in table");
      return res.status(404).json({ message: 'No articles found' });
    }

    console.log("✅ Articles fetched:", results.length);
    res.status(200).json(results);

  } catch (err) {
    console.error("❌ Error fetching articles:", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllArticles };
