var mysql   = require('mysql');

function REST_ROUTER(router,pool,md5) {
    var self = this;
    self.handleRoutes(router,pool,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,pool,md5) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });

    router.get("/graves",function(req,res){
        var queryString = "SELECT * FROM ??";
        var table = ["grave"];
        queryString = mysql.format(query,table);
		console.log(queryString);
        pool.getConnection(function(err,connection){
            connection.query(queryString, function(err, rows){
                connection.release();
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                    console.log("REST.JS:   Error executing MySQL query");
                } else {
                    res.json({"Error" : false, "Message" : "Success", "Users" : rows});
                }
            });

        });
    });
/*
    router.get("/graves/:id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["grave","g_id", req.params.id];
        query = mysql.format(query,table);
		console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
				if(rows.length!=0){
					res.json({"Error" : false, "Message" : "Success", "User" : rows[0]});
				}
            }
        });
    });

    router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["user_login","user_email","user_password",req.body.email,md5(req.body.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });

    router.put("/users",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["user_login","user_password",md5(req.body.password),"user_email",req.body.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
            }
        });
    });

    router.delete("/users/:email",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["user_login","user_email",req.params.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with email "+req.params.email});
            }
        });
    });*/
}

module.exports = REST_ROUTER;