var express = require('express');
var router = express.Router();
var Twit = require('twit'); // this is how we import the twit package
var config = require('./configure')//this is we import the config file which is a js file which contains the keys ans tokens
var dataContent;
var T = new Twit(config); //this is the object of twit which will help us to call functions inside it


/*var params = {
   track:foo,

    geocode:true
}*/

var params2 = {
    screen_name:'Toronto Police OPS',
    count:10

}

router.get('/', function (req, res, next) {// this one handle the POST method
    /*T.get('statuses/filter', params,(err, data, response)=>{

        for(var i=0;i<data.statuses.length;i++){
            if (data.statuses[i].place!=null){
                console.log('tweet number'+i);
                console.log(data.statuses[i].text);

            }

        }

        res.json(data);

    });
*/


    T.get('statuses/user_timeline',params2,(err, data, response)=>{
        res.json(data);// ERROR: can't set headers after they are sent to the client REASON: means that you're already in the body or finished
        //state, but some function tried to set a header or statusCode. In this case, there are two res.json here.
    })
})

/* // this is the param variable which will have key and value the key is the keyword which we are interested in searching and count is the count of it
 // get is the function to search the tweet which three paramaters 'search/tweets',params and a callback function.
function searchedData(err, data, response) {
    //console.log(data);

} // searchedData function is a callback function which returns the data when we make a search*/

module.exports=router;

