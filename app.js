const MongoClient = require('mongodb').MongoClient;
var createError = require('http-errors');
const assert = require('assert');
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogueRouter = require('./routes/catalog');

const pass = process.env.DB_PASS

// Connection URL
const url = `mongodb+srv://Sergi:${pass}@cluster0-ej6db.mongodb.net/nodeBooks?retryWrites=true&w=majority`;

// Create a new MongoClient
// const client = new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});

// Get the default connection
var db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogueRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);

//   // Results
//   const db = client.db('nodeBooks');
//   const booksCollection = db.collection('books'); 
//   console.log("Connected successfully to server");
  
//   booksCollection.find().toArray(function(err, result){
//     if(err) throw err;
//     console.log(result);
//   });

//   app.get('/', (req, res) => {
//    res.render('index')
//   });
// });

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