const db = require('../config/db');

const getAllBooks = async (req, res) => {
  console.log("➡️ GET /api/books called");

  try {
    const [results] = await db.query('SELECT * FROM books');

    if (!results.length) {
      console.warn("⚠️ No books found in table");
      return res.status(404).json({ message: 'No books found' });
    }

    console.log("✅ Books fetched:", results.length);
    res.status(200).json(results);

  } catch (err) {
    console.error("❌ Error fetching books:", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllBooks };
