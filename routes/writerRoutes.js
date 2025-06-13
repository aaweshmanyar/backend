const express = require('express');
const router = express.Router();
const { getAllWriter } = require('../controllers/writerController.js');

router.get('/', getAllWriter); // GET /api/books

module.exports = router;
