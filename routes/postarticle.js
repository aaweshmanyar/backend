const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // in-memory upload
const articleController = require("../controllers/PostArticle");

router.post("/postarticle", upload.single("image"), articleController.createArticle);

module.exports = router;
