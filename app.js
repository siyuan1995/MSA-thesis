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






var app = express();

app.use(bodyParser.urlencoded({limit:'50mb', extended: true, parameterLimit:50000} ));
app.use(bodyParser.json({limit:'50mb'}));



var cors = require('cors');
//////////////////////////////////////////////////////// Routers for crime data
var Read_Assualt=require('./routes/Read/Read_Assualt');
var Read_break=require('./routes/Read/Read_break');
var Read_Homecide=require('./routes/Read/Read_Homecide');
var Read_Robbery=require('./routes/Read/Read_Robbery');
var Read_Theft=require('./routes/Read/Read_Theft');
//var TContent=require('./SearchTweets');
var Read_All=require('./routes/Read/Read_All');
var Morans_I=require('./routes/Spatial_analyzation/SpatialWeight_Moran');
var spatial_correlation=require('./routes/Spatial_analyzation/Spatial_Correlation');
var get_Mean_Center=require('./routes/Spatial_analyzation/Mean_Center');
var standard_ellipse=require('./routes/Spatial_analyzation/standard_ellipse');
var uploadfile=require('./routes/Upload2S3');// the require here has to find the true path in the directory
var GetisOrd=require('./routes/Spatial_analyzation/Getis_ord');
var twitterStream=require('./TwitterStream');
//////////////////////////////////////////////////////////



//var socket=require('socket.io')
var server=app.listen(3000);// This place solved the problem that THE SOCKET.IO ADN APP USE THE SAME PORT.
/*var io=socket(server);
    io.on('connection',function (socket) {
    console.log('socket connected');
    socket.emit('news', {hello: 'world'});
       socket.on('my other event', function (data) {
           console.log('2');})

});*/



app.use(cors());


app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})
app.get('/sample',function(req, res) {
    res.send('this is a sample!');}
)
// view engine setup
app.set('views', path.join(__dirname, 'views'));//这个地方就自动去找views下的index文件并且自动编译了ejs到html
app.set('view engine', 'ejs');
app.use(logger('dev'));// app.js is like a glue to combine all middle ware together, when the request get in, it go through
//each app.use before find the corresponding path.
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
//app.use('/users', usersRouter);


app.use('/Read_Assualt',Read_Assualt);
app.use('/Read_break',Read_break);
app.use('/Read_Homecide',Read_Homecide);
app.use('/Read_Robbery',Read_Robbery);
app.use('/Read_Theft',Read_Theft);
app.use('/Read_All',Read_All);
app.use('/SpatialWeight_Moran',Morans_I);
app.use('/Spatial_Correlation',spatial_correlation);
app.use('/Mean_Center',get_Mean_Center);
app.use('/Standard_ellipse',standard_ellipse);
app.use('/uploadfile',uploadfile);
app.use('/GetisOrd',GetisOrd);


//app.use('/TweetContent',TContent);

console.log('app.js is executed');







































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
//module.exports = {app};

//Google账户API 秘钥 ：AIzaSyAZrzcF2lys_CtA3bZAzzGu9gcqHDpgsfA







