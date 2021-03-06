/*
 *
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware
app.use(logger('dev'));
app.use(require('less-middleware')(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res, next) {
  res.render('index', {
    title: "phi's portfolio",
    url: "http://phifolio.me",
    email: 'phi1618jp@gmail.com',
    description: 'phi のポートフォリオです.',
    keywords: 'web,javascript',
    social: {
      twitter: {
        name: 'phi_jp',
      },
      hatebu: {
        name: 'phiary',
      },
    },
    pretty: true,
  });
});

var server = app.listen((process.env.PORT || 3000), function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
