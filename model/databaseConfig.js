/*
  Configure the host, port, user, password and the database's name
  so that it can connect to the mysql server
*/

let mysql = require('mysql');

var dbconnect = {
    getConnection: function() {
    var conn =    mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "12345",
    database: "moviedatabase",
    
}); 
     
    return conn;

}};

module.exports = dbconnect;