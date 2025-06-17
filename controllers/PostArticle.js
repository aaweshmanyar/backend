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
    isDeleted
  } = req.body;

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
    language,
    date,
    tags,
    card,
    isPublished || 0,
    isDeleted || 0
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Insert failed:", err);
      return res.status(500).json({ error: "Failed to insert article" });
    }
    res.status(201).json({ message: "Article inserted", articleId: result.insertId });
  });
};
