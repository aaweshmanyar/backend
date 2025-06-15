const db = require('../config/db');

const getAllWriter = async (req, res) => {
  console.log("➡️ GET /api/writer called");

  try {
    const [results] = await db.query('SELECT * FROM writer');

    if (!results.length) {
      console.warn("⚠️ No writers found in table");
      return res.status(404).json({ message: 'No writers found' });
    }

    console.log("✅ Writers fetched:", results.length);
    res.status(200).json(results);

  } catch (err) {
    console.error("❌ Error fetching writers:", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllWriter };
