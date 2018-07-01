var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});//you can add as many as router you needed here, and the app.js file will atuomaticaly come here to find the router when is running.

router.get('../public', function(req, res, next) {
    res.send('respond with a resource');
    console.log('6');
});


module.exports = router;
