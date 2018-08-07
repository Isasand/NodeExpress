var express = require('express');
var router = express.Router();


router.get('/',  function(req, res) {

    res.render('index');
    console.log('at index.js'); 

});


module.exports = router;