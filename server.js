var app = require('./controller/app');
var port = 3000

var server = app.listen(port, function(){
    console.log('Web App Hosted at http://localhost:%s',port);
});