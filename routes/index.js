var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });
});

router.get('../public', function(req, res, next) {
    res.send('respond with a resource');
    console.log('6');
});
module.exports = router;
