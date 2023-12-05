/*
  Add data to the Genre Table using the Insert statement.
  */
var db = require("./databaseConfig");
var app = require("../controller/app");

var addgenreDB = {
  addgenre: function (nameofgenre,description,callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        const sql = "INSERT INTO genre (nameOfGenre,description) VALUES (?,?)";
        conn.query(sql, [nameofgenre,description], function (err, result) {
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

module.exports = addgenreDB;

