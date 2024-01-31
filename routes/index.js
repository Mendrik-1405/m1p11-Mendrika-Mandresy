var express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    res.send('hello mongodb connected');
  } catch (error) {
    res.send('hello but mongodb not connected');
  }
});

module.exports = router;
