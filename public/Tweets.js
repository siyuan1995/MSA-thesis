
var Twit = require('twit'); // this is how we import the twit package
var config = require('./configure')//this is we import the config file which is a js file which contains the keys ans tokens
var T = new Twit(config); //this is the object of twit which will help us to call functions inside it
var stream=T.stream('statuses/filter',{track:'Weed'});

stream.on('tweet', function (tweet) {
    console.log(tweet)
})




/*

var params={
    screen_name:'TPSOperations',// NOTICE: the screen name is the name after '@', and if you do not give a right screen
    // name, it will return the timeline information of your own account
    count: 10,
    //geocode:
    /!*q: 'weed',
    count:10*!/
}

T.get('statuses/user_timeline',params,(err,data,response)=>{

    console.log(data);
})
*/
