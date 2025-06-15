const express = require('express');
const router = express.Router();
const { getAllViews } = require('../controllers/viewController');

router.get('/', getAllViews);

module.exports = router;
