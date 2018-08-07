var express = require('express');
var app = express();
var path = require('path');

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

var index =  require('./routes/index');
var errorpage = require('./routes/error'); 

app.use('/index', index);
app.use('*', errorpage); 

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Listening at http://%s:%s", host, port)
})