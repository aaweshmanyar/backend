const db = require('../config/db');

const getAllWriter = (req, res) => {
  console.log("➡️ GET /api/writer called");

  const query = 'SELECT * FROM writer'; // Replace with actual table name if different

  db.query(query, (err, results) => {
    if (err) {
        console.log(results)
      console.error("❌ DB Query Failed:", err.message); // <-- See the error
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("✅ DB Query Success:", results);
    res.status(200).json(results);
  });
};

module.exports = { getAllWriter };
