var express = require('express');
var mysql = require('mysql');
var router = express.Router();
const requestIp = require('request-ip');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./mysql.properties');

function convertDate(date) {
	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth()+1).toString();
	var dd  = date.getDate().toString();
	var mmChars = mm.split('');
	var ddChars = dd.split('');
	var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
	return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]) + ' ' + hour + ':' + min + ':' + sec;
}

var requestInfoMw = (req, res, next) => {
	var requestInfo = {
		originalUrl : req.originalUrl, 
		method : req.method, 
		statusCode : res.statusCode,
		timeStamp : convertDate(new Date()),
		clientIp : requestIp.getClientIp(req)
	}
	res.locals.requestInfo = requestInfo; 
	next()
}
 

connectMysqlMw = (req, res, next) =>{
	var connection = mysql.createConnection({
		host     : properties.get('host'),
		user     : properties.get('user'),
		password : properties.get('password'),
		database : propertiews.get('database')
	});

	var i = res.locals.requestInfo;

	connection.connect()
	var query = "INSERT INTO reqdata VALUES ('" + i.originalUrl + "','" + i.method + "','" + i.statusCode + "','" + i.timeStamp + "','" + i.clientIp+ "');"; 

	connection.query(query, (err, rows, fields) =>{
		if(err) throw err
	})

	console.log(res.locals.requestInfo.originalUrl)

	connection.end(); 
	next()
}


router.use(requestInfoMw);
router.use(connectMysqlMw); 

router.get('/', (req, res) => {
   res.send(res.locals);
});


module.exports = router;


