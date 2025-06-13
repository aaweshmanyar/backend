const express = require('express');
const router = express.Router();
const { getAllBooks } = require('../controllers/bookController');

router.get('/', getAllBooks); // GET /api/books

module.exports = router;
