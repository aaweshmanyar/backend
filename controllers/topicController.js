const db = require('../config/db');

const getAllTopic = async (req, res) => {
  console.log("➡️ GET /api/topics called");

  try {
    const [results] = await db.query('SELECT * FROM topic');

    if (!results.length) {
      console.warn("⚠️ No topics found in table");
      return res.status(404).json({ message: 'No topics found' });
    }

    console.log("✅ Topics fetched:", results.length);
    res.status(200).json(results);

  } catch (err) {
    console.error("❌ Error fetching topics:", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllTopic };
