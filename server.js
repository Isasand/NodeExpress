var express = require('express');
var app = express();
var path = require('path');

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

var index =  require('./routes/index');
var errorpage = require('./routes/error'); 
var data = require('./routes/data'); 

app.use('/', index);
app.use('/data', data); 

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
  
   console.log("Listening at http://%s:%s", host, port)
})
