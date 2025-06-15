const express = require('express');
const router = express.Router();
const { getAllWriter } = require('../controllers/writerController');

router.get('/', getAllWriter);

module.exports = router;
