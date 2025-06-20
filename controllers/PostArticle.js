const db = require("../config/db"); // MySQL connection

// Utility to generate slug from title
const generateSlug = (title) => {
  return title
    .trim()
    .replace(/\s+/g, "-")             // Replace spaces with hyphens
    .replace(/[^a-zA-Z0-9\-]/g, "")   // Remove non-alphanumeric characters (except hyphen)
    .toLowerCase();                   // Lowercase for consistency
};

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

  const slug = generateSlug(title);
  const createdOn = new Date();
  const modifiedOn = new Date();
  const views = 0;
  const isDeleted = 0;

  const sql = `
    INSERT INTO New_Articles 
    (image, title, slug, englishDescription, urduDescription, topic, writers, writerDesignation, translator, language, date, tags, views, createdOn, isPublished, modifiedOn, isDeleted)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    imageBuffer,
    title,
    slug,
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
    res.status(200).json({ message: "Article inserted successfully.", articleId: result.insertId });
  });
};

// Get single article by ID
exports.getArticleById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Article ID is required.");
  }

  const sql = `
    SELECT 
      id,
      title,
      slug,
      englishDescription,
      urduDescription,
      topic,
      writers,
      writerDesignation,
      translator,
      language,
      date,
      tags,
      views,
      createdOn,
      modifiedOn,
      isPublished
    FROM New_Articles
    WHERE id = ? AND isDeleted = 0
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching article:", err);
      return res.status(500).send("Error fetching article.");
    }

    if (results.length === 0) {
      return res.status(404).send("Article not found.");
    }

    res.status(200).json(results[0]);
  });
};
