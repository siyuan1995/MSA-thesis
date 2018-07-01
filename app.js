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
var TContent=require('./TwitterData');

var app = express();

app.get('/sample',function(req, res) {
    res.send('this is a sample!');}
)
// view engine setup
app.set('views', path.join(__dirname, 'views'));//这个地方就自动去找views下的index文件并且自动编译了ejs到html
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get('/public',)
app.use('/Coords', Coords);// the path of app.use is the path fo req from client
app.use('/TweetContent',TContent);
var data=Coords.data;
//console.log(data);
/*app.post('/Coords', (req,res,next)=>{ // app.what depends on what kind of req you are going to handle, so whatever get,post, they are handle
  // requests, if you use app.use()
    console.log('top:');
    console.log(req.body.top);
    console.log('bottom:');
    console.log(req.body.bottom);
    console.log('right:');
    console.log(req.body.right);
    console.log('left:');
    console.log(req.body.left);

  next();
});*/

app.listen(3000);

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



module.exports = app;



//Google账户API 秘钥 ：AIzaSyAZrzcF2lys_CtA3bZAzzGu9gcqHDpgsfA







