/*
  Search a particular movie using the Like operator in ascending order of release date
*/   
var db = require("./databaseConfig");
var app = require("../controller/app");

var searchmovieDB = {
  displaysearchmovie: function (name,callback) {
    var conn = db.getConnection();
    let replacement = `'%${name}%'`;
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        const sql = `SELECT movieID, name, description, DATE_FORMAT(release_date,'%y/%c/%e') AS date_release,imageURL,genreId,active,date_INserted FROM movie where name LIKE ${replacement} ORDER BY release_date ASC`;
        conn.query(sql,function (err, result) {
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

module.exports = searchmovieDB;

