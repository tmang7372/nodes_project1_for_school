/*
  Find out whether the email, role and password are in the database
  using the Select statement 
*/
var db = require("./databaseConfig");
var app = require("../controller/app");

var userDB = {
  getLogginUser: function (email,role,password,callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = "SELECT * FROM user WHERE email=? AND role=? AND password=?";
        conn.query(sql, [email,role,password], function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        });
      }
    });
  },
};

module.exports = userDB;


