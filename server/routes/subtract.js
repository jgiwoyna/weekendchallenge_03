var express = require('express');
var router = express.Router();
var equation = {};

router.post('/subtract', function(req, res){
  equation = req.body;
});
