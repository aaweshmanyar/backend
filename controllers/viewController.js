const db = require('../config/db');

const getAllViews = async (req, res) => {
  console.log("➡️ GET /api/views called");

  try {
    const [results] = await db.query('SELECT * FROM views');

    if (!results.length) {
      console.warn("⚠️ No views found in table");
      return res.status(404).json({ message: 'No views found' });
    }

    console.log("✅ Views fetched:", results.length);
    res.status(200).json(results);

  } catch (err) {
    console.error("❌ Error fetching views:", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllViews };
