var express = require('express');
var router = express.Router();

/*router.get('/', function (req, res, next) { // the path here is the path that come from app.use with a GET method, cause app.use required this router.
    // 相当于一级一级的路径查找， the get here is get the req from client

    res.send('hi2');
    res.json({text: 'Wiki home page'});
    next();
});*/


router.post('/', function (req, res) {// this one handle the POST method

    res.send('success');
    console.log('success');
    //res.json(req.body); // use res.json to send data back to frontend

    //pass the data to db here
});

module.exports = router;
