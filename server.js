// var express = require('express'),
    // bodyParser      = require('body-parser'),
    // methodOverride  = require('method-override'),
    // sessions        = require('./routes/sessions'),
    // app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
    // extended: true
// }));
// app.use(methodOverride());      // simulate DELETE and PUT

////CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
// app.all('*', function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // next();
// });

// app.get('/sessions', sessions.findAll);
// app.get('/sessions/:id', sessions.findById);

// app.set('port', process.env.PORT || 5000);

// app.listen(app.get('port'), function () {
    // console.log('Express server listening on port ' + app.get('port'));
// });
var express = require("express");
var app = express();
app.use(express.logger());

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-02.cleardb.net',
  user     : 'b6c98aad74a22c',
  password : '2a75abe3',
  database : 'heroku_1dd38a75e1b5ba5'
});

connection.connect();

app.get('/', function(request, response) {
  response.send('Hello World!!!! HOLA MUNDOOOOO!!!');
  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;

      response.send('The solution is: ', rows[0].solution);
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});