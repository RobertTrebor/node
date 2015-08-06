var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('md5');
var rest = require("./REST.js");
var app  = express();

function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 10,
        // host     : 'us-cdbr-iron-east-02.cleardb.net',
        // user     : 'b6c98aad74a22c',
        // password : '2a75abe3',
        // database : 'heroku_1dd38a75e1b5ba5',
		// host     : 'us-cdbr-iron-east-02.cleardb.net',
        host     : 'localhost:3306',
		user     : 'root',
        password : '',
        database : 'cimitery',
        debug    :  true
    });
    pool.getConnection(function(err,connection){
        if(err) {
	      console.log("server.js: Error in MySQL Connection");
          self.stop(err);
        } else {
          self.configureExpress(connection);
		  console.log("RL: Mysql connected");
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
	  app.use('', router);
      var rest_router = new rest(router,connection,md5);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("All right ! I am alive at Port 3000.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
}

new REST();

//------------------------------------------

var sessions        = require('./routes/sessions');
//var	graves			= require('./routes/graves');

/*
var express = require('express');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var app = express();
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(methodOverride());      // simulate DELETE and PUT

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/sessions', sessions.findAll);
app.get('/sessions/:id', sessions.findById);

//app.get('/graves', graves.findAll);
//app.get('/graves/:graveId', graves.findById);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

