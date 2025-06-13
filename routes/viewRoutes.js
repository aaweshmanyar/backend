const express = require('express');
const router = express.Router();
const { getAllViews } = require('../controllers/viewController.js');

router.get('/', getAllViews); // GET /api/books

module.exports = router;
