const express = require('express');

const emojis = require('./emojis');
const flags = require('./flags');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/flags',flags);

module.exports = router;
