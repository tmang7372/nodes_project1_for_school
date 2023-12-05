const express = require("express");

let user = require('../model/loggin');
let addmovie = require('../model/addmovie');
let addgenre = require('../model/addgenre');
let displaymovie = require('../model/movie');
let displaygenre = require('../model/genre');
let searchmovie = require('../model/searchmovie');
let searchmoviegenreid = require('../model/searchmovieid')

let isAdmin = false; 

const app = express();
app.use(express.json());

/*Check whether the email, password, role are in the user table
  If it is in the table, it will check whether it is user or admin
  If it is admin, a flag will be set so that it can add movie and genre
*/
app.post('/loggedin',function(request,response){
  email = request.body.email;
  password = request.body.password;
  role = request.body.role;
  user.getLogginUser(email,role,password,function(err,result){
    isAdmin = false  
    if(!err){
          if(result.length > 0) {
            if(result[0].role === "admin"){
                isAdmin = true
                response.status = 200;
                response.setHeader("Content-Type", "text/html");
                response.send("<h1>You are in the database and have log in as an admin.</h1>");
            }else if(result[0].role === "user"){
                response.status = 404;
                response.setHeader("Content-Type", "text/html");
                response.send("<h1>You are not the admin and therefore cannot add movie or genre</h1>");
            }
          }else {
                response.status = 404;
                response.setHeader("Content-Type", "text/html");
                response.send("<h1>The user cannot be find in database</h1>");
    }
    } else {
          response.status(500).send("Some error");
      }
  })
});

/* Check whether it is admin and also whether a flag is set to true
   If the flag is set, it can add the movie data into the table
*/   
app.post('/addmovie',function(request,response){
  if(isAdmin){  
    nameofmovie = request.body.nameOfMovie;
    description = request.body.descriptionOfMovie;
    releaseDate = request.body.releaseDate;
    image_URL  = request.body.image_URL;
    genreId  = request.body.genre_ID;
    active = request.body.active;
    addmovie.addmovie(nameofmovie,description,releaseDate,image_URL,genreId,active,function(err,result){
      if(err){
        response.status(505).send("Some error")
      }else {
        response.status(404).setHeader("Text-Content","text/html").send("<h1>One record has been added to the table</h1>")
      }
    })}else {
      response.status(404).setHeader("Text-Content","text/html").send("<h1>You are not admin and cannot add movie to the table.</h1>")
    }
})

/*Check whether a flag is set to true if the user is an admin
  If the flag is set, it can add data to the genre
*/  
app.post('/addgenre',function(request,response){
  if(isAdmin){ 
    nameofgenre = request.body.name;
    description = request.body.description;
  
    addgenre.addgenre(nameofgenre,description,function(err,result){
      console.log(result)
      if(!err){
        response.status(200).setHeader("Content-Type","text/html").send("<h1>One records has been inserted into the Genre Table.</h1>")
      }else {
       response.status(404).setHeader("Content-Type","text/html").send("Error in adding")
    }
  })}else {
    response.status(500).setHeader("Content-Type","text/html").send("<h1>You cannot add genre as you are not admin</h1>");
  }
})

//Display the movie data in a table if the call to the SQL is success
app.get('/movie',function(request,response){
  
  displaymovie.displaymovie(function(err,result){
    if(err){
      response.status(505).send("Some error")
    }else {
      let words = ''; 
      for(let i=0;i<result.length;i++){
          words = words + '<tr style="background-color: #FFCA28">'+'<td style="border: 2px solid #B71C1C; color: #B71C1C; text-align: center">'+ result[i].movieID+'</td>'
          words = words + '<td style="border: 2px solid #B71C1C; text-align: center; color: #B71C1C">'+ result[i].name+'</td>'
          words = words + '<td style="border: 2px solid #B71C1C; text-align: center; color: #B71C1C">'+ result[i].description+'</td>'
          words = words + '<td style="border: 2px solid #B71C1C; text-align: center; color: #B71C1C">'+ result[i].date_release+'</td>'
          words = words + '<td style="border: 2px solid #B71C1C; text-align: center; color:#B71C1C">'+ result[i].imageURL+'</td>'
          words = words + '<td style="border: 2px solid #B71C1C; text-align: center; color: #B71C1C">'+ result[i].genreId+'</td>'
          words = words + '<td style="border: 2px solid #B71C1C; text-align: center; color: #B71C1C">'+ result[i].active+'</td>'
          words = words + '<td style="border: 2px solid #B71C1C; text-align: center; color: #B71C1C">'+ result[i].date_INserted+'</td>'+'</tr>'
        }
        // response.send(result);
        response.send(`<table style="border: 2px solid #B71C1C; border-collapse: collapse"><tr style="background-color: #F9A825"><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Movie Id</th>
        <th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Name</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold" >Description</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Release Date</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">ImageURL</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">GenreId</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Active</th>
        <th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Date Inserted</th></tr>${words}</table>`)
  
}})
  })

//Display the data of the Genre table in a table
  app.get('/genre',function(request,response){
  
    displaygenre.displaygenre(function(err,result){
      if(err){
        response.status(505).send("Some error")
      }else {
        let words = ''; 
        for(let i=0;i<result.length;i++){
            words = words + '<tr style="background-color: #FFCA28">'+'<td style="border: 1px solid #130606; color: #B71C1C; text-align: center">'+ result[i].genreID+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].nameOfGenre+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].description+'</td>'
         }
          // response.send(result);
          response.send(`<table style="border: 2px solid #B71C1C; border-collapse: collapse; margin-left: auto; margin-right: auto"><tr style="background-color: #F9A825"><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Genre Id</th>
          <th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Name of Genre</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Description</th>
          </tr>${words}</table>`)
    
  }})
    })

//Display a search result in a table
app.post('/searchmovie',function(request,response){
    if(request.body.name){
      searchmovie.displaysearchmovie(request.body.name,function(err,result){
        if(err){
          response.status(505).send("Some error")
        }else {
          let words = ''; 
          for(let i=0;i<result.length;i++){
              words = words + '<tr style="background-color: #FFCA28">'+'<td style="border: 1px solid #130606; color: #B71C1C; text-align: center">'+ result[i].movieID+'</td>'
              words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].name+'</td>'
              words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].description+'</td>'
              words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].date_release+'</td>'
              words = words + '<td style="border: 1px solid #130606; text-align: center; color:#B71C1C">'+ result[i].imageURL+'</td>'
              words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].genreId+'</td>'
              words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].active+'</td>'
              words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].date_INserted+'</td>'+'</tr>'
            }
            // response.send(result);
            response.send(`<table style="border: 2px solid #B71C1C; border-collapse: collapse"><tr style="background-color: #F9A825"><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Movie Id</th>
            <th style="border: 2px solid #B71C1C; color:#BF360C,; font-weight: bold">Name</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold" >Description</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Release Date</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">ImageURL</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">GenreId</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Active</th>
            <th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Date Inserted</th></tr>${words}</table>`)
      
    }}
  )}else if(request.body.genreid){
    searchmoviegenreid.searchmoviegenreid(request.body.genreid,function(err,result){
      if(err){
        response.status(505).send("Some error")
      }else {
        let words = ''; 
        for(let i=0;i<result.length;i++){
            words = words + '<tr style="background-color: #FFCA28">'+'<td style="border: 1px solid #130606; color: #B71C1C; text-align: center">'+ result[i].movieID+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].name+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].description+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].date_release+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color:#B71C1C">'+ result[i].imageURL+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].genreId+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].active+'</td>'
            words = words + '<td style="border: 1px solid #130606; text-align: center; color: #B71C1C">'+ result[i].date_INserted+'</td>'+'</tr>'
          }
          // response.send(result);
          response.send(`<table style="border: 2px solid #B71C1C; border-collapse: collapse"><tr style="background-color: #F9A825"><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Movie Id</th>
          <th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Name</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold" >Description</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Release Date</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">ImageURL</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">GenreId</th><th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Active</th>
          <th style="border: 2px solid #B71C1C; color:#BF360C; font-weight: bold">Date Inserted</th></tr>${words}</table>`)
    
  }
})
  }
      })

module.exports = app;
