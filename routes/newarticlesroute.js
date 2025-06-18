const express = require('express');
const router = express.Router();
const { getNewArticles } = require('../controllers/Newarticlecontroller');

router.get('/', getNewArticles);

module.exports = router;
