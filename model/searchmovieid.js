/*
  Search a particular movies using Genre ID in ascending order of Release Date
*/  
var db = require("./databaseConfig");
var app = require("../controller/app");

var searchmoviegenreidDB = {
  searchmoviegenreid: function (genreid,callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        const sql = "SELECT movieID, name, description, DATE_FORMAT(release_date,'%y/%c/%e') AS date_release,imageURL,genreId,active,date_INserted FROM movie WHERE genreId = ? ORDER BY release_date ASC";
        conn.query(sql, [genreid], function (err, result) {
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

module.exports = searchmoviegenreidDB;

