const express = require('express');
const router = express.Router();

router.get('/ip-check', (req, res) => {
  const ip =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.send(`Your public IP is: ${ip}`);
});

module.exports = router;
