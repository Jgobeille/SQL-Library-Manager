const express = require('express');

const router = express.Router();

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, _next) => {
  res.redirect('/books/?page=1');
});

module.exports = router;
