/*
var express = require('express');
var router = express.Router();
var Twit = require('twit'); // this is how we import the twit package
var config = require('./configure')//this is we import the config file which is a js file which contains the keys ans tokens
var T = new Twit(config); //this is the object of twit which will help us to call functions inside it

var params={
    screen_name:'TPSOperations',// NOTICE: the screen name is the name after '@', and if you do not give a right screen
    // name, it will return the timeline information of your own account
    count: 10,
    //geocode:
    /!*q: 'weed',
    count:10*!/
}

router.get('/',function(req,res,next){

    T.get('statuses/user_timeline',params,(err,data,response)=>{

        res.json(data);
    })
})

module.exports=router;*/

var TwitterApproach=function () {

    var Twit = require('twit'); // this is how we import the twit package
    var config = require('./configure')//this is we import the config file which is a js file which contains the keys ans tokens
    var T = new Twit(config); //this is the object of twit which will help us to call functions inside it
    var stream=T.stream('statuses/filter',{track:'Weed'});

    stream.on('tweet', function (tweet) {
        console.log(tweet)
    })

    var socket=io.connect('http://localhost:3000');
    socket.on('news', function (data) {
        console.log(data);
        console.log('It is connected!')
        socket.emit('my other event', { my: 'data' });
    });

console.log('Console text from twitter')

}

module.exports=TwitterApproach;


