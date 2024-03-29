var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');

var db = require('./models').db;

var app = express();

// swig rendering boilerplate
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

// logging and body-parsing
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// statically serve front-end dependencies
app.use('/random', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/functions', express.static(__dirname + '/jquery'));

// serve any other static files
app.use(express.static(__dirname + '/public'));

// serve dynamic routes
app.use(require('./routes'));

// failed to catch req above means 404, forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function (err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.render('error', {
    error: err
  });
});

// listen on a port
var port = 3000;
app.listen(port, function () {
  console.log('The server is listening closely on port', port);
  db.sync()
  .then(function () {
    console.log('Synchronated the database');
  })
  .catch(function (err) {
    console.error('Trouble right here in River City', err, err.stack);
  });
});
