var express = require('express');
var router = express.Router();
var mysql = require('mysql')
const requestIp = require('request-ip');


function convertDate() {
	var date = new Date();
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
		timeStamp : convertDate(),
		clientIp : requestIp.getClientIp(req)
	}
	res.locals.requestInfo = requestInfo; 
	next()
}
 

connectMysqlMw = (req, res, next) =>{
	var connection = mysql.createConnection({
		host     : '192.168.0.131',
		user     : 'expressApplication',
		password : 'express',
		database : 'expressapp'
	});

	connection.connect()
	connection.query('select * from reqdata', (err, rows, fields) =>{
		if(err) throw err
		//console.log(rows[0])
	})

	console.log(res.locals.requestInfo.originalUrl)
	connection.end(); 
	next()
}


module.exports = {

	convertDate : convertDate(), 
	requestInfoMw : requestInfoMw(), 
	connectMysqlMw : connectMysqlMw()

};