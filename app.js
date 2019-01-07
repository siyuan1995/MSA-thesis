// 这个app.js就是相当于主程序
// middleware equals class in java, so we can call middleware like call a class, just require it, and then use it.

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');
var Coords = require('./routes/Coords');
//////////////////////////////////////////////////////// Routers for crime data
var Read_Assualt=require('./routes/Read_Assualt');
var Read_break=require('./routes/Read_break');
var Read_Homecide=require('./routes/Read_Homecide');
var Read_Robbery=require('./routes/Read_Robbery');
var Read_Theft=require('./routes/Read_Theft');
var TContent=require('./SearchTweets');
var Read_All=require('./routes/Read_All');
//////////////////////////////////////////////////////////
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.listen(3000);// One way to pass app instance is the 'circular dependency', but it is suggested to avoid it. !!!!SOCKET.IO PART IMPORTANT!!!
//server.listen(3000)// This place if you want to use the same port with app.js and socket.io, you could either 1.USE socket.io in app.js or 2.PASS app instance to Twitterstream File and then use socket.io
/*
io.on('connection',function (socket) {
    console.log('connected');

    socket.emit('news', {hello: 'world'});
       socket.on('my other event', function (data) {
           console.log('2');})

})*/






app.get('/sample',function(req, res) {
    res.send('this is a sample!');}
)
// view engine setup
app.set('views', path.join(__dirname, 'views'));//这个地方就自动去找views下的index文件并且自动编译了ejs到html
app.set('view engine', 'ejs');
app.use(logger('dev'));// app.js is like a glue to combine all middle ware together, when the request get in, it go through
//each app.use before find the corresponding path.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get('/public',)
app.use('/Coords', Coords);// the path of app.use is the path fo req from client
///////////////////////////////////////////////////
app.use('/Read_Assualt',Read_Assualt);
app.use('/Read_break',Read_break);
app.use('/Read_Homecide',Read_Homecide);
app.use('/Read_Robbery',Read_Robbery);
app.use('/Read_Theft',Read_Theft);
app.use('/Read_All',Read_All);

app.use('/TweetContent',TContent);
var data=Coords.data;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

console.log('3000');







































// catch 404 and forward to error handler, everything should place before this otherwise it won't be call
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = {app,server};


//Google账户API 秘钥 ：AIzaSyAZrzcF2lys_CtA3bZAzzGu9gcqHDpgsfA







