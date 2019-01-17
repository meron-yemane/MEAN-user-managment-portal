const express = require('express');
const router = express.Router();

// check if GET api listening
router.get('/', (req, res) => {
  res.send('api is working properly');
});

module.exports = router;