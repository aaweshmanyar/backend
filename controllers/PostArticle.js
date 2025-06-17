const db = require('../config/db'); // adjust path if different

// Insert new article into DB
exports.insertArticle = (req, res) => {
  const {
    slug,
    image,
    topic,
    title,
    content,
    writers,
    language,
    date,
    tags,
    card,
    isPublished,
    isDeleted,
  } = req.body;

  // Convert language string to integer ID (assuming you follow a convention)
  const languageMap = {
    english: 1,
    urdu: 2,
    roman: 3,
  };

  const languageId = languageMap[language?.toLowerCase()] || null;

  const sql = `
    INSERT INTO new_articles (
      slug, image, topic, title, content, writers, language, date,
      tags, card, isPublished, isDeleted
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    slug,
    image,
    topic,
    title,
    content,
    writers,
    languageId,
    date,
    tags,
    card,
    isPublished ? 1 : 0,
    isDeleted ? 1 : 0,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Insert failed:", err.sqlMessage || err.message);
      return res.status(500).json({ error: "Failed to insert article" });
    }
    res.status(201).json({ message: "Article inserted", articleId: result.insertId });
  });
};
