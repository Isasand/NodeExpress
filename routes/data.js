var express = require('express');
var router = express.Router();
var mysql = require('mysql')
const requestIp = require('request-ip');


var ipMiddleware = (req,res,next) =>{
	const clientIp = requestIp.getClientIp(req); 
	console.log("somebody visited the data page with ip ", clientIp); 
	next()
}

router.use(ipMiddleware); 

router.get('/', function (req, res) {
   res.send("hello there");
});


module.exports = router;


