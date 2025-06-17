const express = require('express');
const router = express.Router();
const articleController = require('../controllers/PostArticle');

router.post('/articles', articleController.insertArticle);

module.exports = router;
