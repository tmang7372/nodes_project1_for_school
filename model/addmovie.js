/*
  Add data to the movie table using the Inset Statement
*/
var db = require("./databaseConfig");
var app = require("../controller/app");

var addmovieDB = {
  addmovie: function (nameofmovie,description,releaseDate,image_URL,genreId,active,callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        const sql = "INSERT INTO movie (name,description,release_date,imageURL,genreId,active) VALUES (?,?,?,?,?,?)";
        conn.query(sql, [nameofmovie,description,releaseDate,image_URL,genreId,active], function (err, result) {
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

module.exports = addmovieDB;

