var express=require('express')
var path = require('path');
//var appFun = require('./app');
var app=express();
var server = require('http').Server(app);
//var server=appFun.server;
var io = require('socket.io')(server);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var twit=require('twit');
var config=require('./configure');
var T=new twit(config);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

server.listen(3003);
var stream=null;


io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});




/*router.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});*/

//router.get('/', function (req, res, next) {// this one handle the POST method

/*io.on('connection',function (socket) {// we are not using any ajax request from clients when we are using sockets.
    //socket.on('start tweets',function () {
    ///

    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log('recieve message from html');})

       /!* if (stream === null) {
            //socket.emit() works fine here
         /!*   var stream = T.stream('statuses/filter', {locations: place});
            stream.on('tweet', function (tweet) {
                var Longtitude = (tweet.place.bounding_box.coordinates[0][0][0] + tweet.place.bounding_box.coordinates[0][2][0]) / 2;
                var Latitude = (tweet.place.bounding_box.coordinates[0][0][1] + tweet.place.bounding_box.coordinates[0][1][1]) / 2;
                var Coordinate = {'lat': Latitude, 'lng': Longtitude};
                socket.emit('twitter-stream', Coordinate);
                socket.broadcast.emit("twitter-stream", Coordinate);


            })*!/
        /!* T.stream('statuses/filter',{'locations':'-180,-90,180,90'},function (s) {
             stream=s;

             stream.on('data',function (data) {
                 var Longtitude = (data.place.bounding_box.coordinates[0][0][0] + data.place.bounding_box.coordinates[0][2][0]) / 2;
                 var Latitude = (data.place.bounding_box.coordinates[0][0][1] + data.place.bounding_box.coordinates[0][1][1]) / 2;
                 var Coordinate = {'lat': Latitude, 'lng': Longtitude};
                 socket.emit('twitter-stream', Coordinate);
                 socket.emit('new2',{hello:'nihao'});

             })

         })*!/



        }*!/


        //})

    })*/




//})









module.exports=app;

