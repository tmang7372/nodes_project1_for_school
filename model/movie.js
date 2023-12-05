/*
  Retrive all the active movies using Select statement
*/
  var db = require("./databaseConfig");
var app = require("../controller/app");

var movieDB = {
  displaymovie: function (callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        const sql = "SELECT movieID, name, description, DATE_FORMAT(release_date,'%y/%c/%e') AS date_release,imageURL,genreId,active,date_INserted FROM movie WHERE active = 'Y'";
        conn.query(sql, function (err, result) {
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

module.exports = movieDB;

