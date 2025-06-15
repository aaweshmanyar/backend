const express = require('express');
const router = express.Router();
const { getAllTopic } = require('../controllers/topicController');

router.get('/', getAllTopic);

module.exports = router;
