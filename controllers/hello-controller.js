var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.send({message: 'Hello World'})
  });

  module.exports = router;