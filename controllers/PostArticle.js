const db = require("../config/db"); // MySQL connection

// Create Article (with optional image + optional fields)
exports.createArticle = (req, res) => {
  const {
    title,
    englishDescription,
    urduDescription,
    topic,
    writers,
    writerDesignation,
    translator,
    language,
    date,
    isPublished,
  } = req.body;

  const imageBuffer = req.file ? req.file.buffer : null;

  let tags = req.body.tags;

  // If tags is an array (FormData appends multiple "tags[]" entries)
  if (Array.isArray(tags)) {
    tags = tags.join(", ");
  }

  if (
    !title ||
    !writers ||
    !language ||
    !date ||
    typeof isPublished === "undefined"
  ) {
    return res.status(400).send("Required fields are missing.");
  }

  const createdOn = new Date();
  const modifiedOn = new Date();
  const views = 0;
  const isDeleted = 0;

  const sql = `
    INSERT INTO New_Articles 
    (image, title, englishDescription, urduDescription, topic, writers, writerDesignation, translator, language, date, tags, views, createdOn, isPublished, modifiedOn, isDeleted)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    imageBuffer,
    title,
    englishDescription?.trim() || null,
    urduDescription?.trim() || null,
    topic || null,
    writers,
    writerDesignation || null,
    translator || null,
    language,
    date,
    tags || null,
    views,
    createdOn,
    isPublished,
    modifiedOn,
    isDeleted,
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).send("Failed to insert article.");
    }
    res.status(200).json({ message: "Article inserted successfully." });
  });
};
