const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(
    __dirname, '..', 'index.html'));
});

module.exports = router;
