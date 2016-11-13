var express = require('express');
var router = express.Router();
var equation = {};

router.post('/add', function(req, res){
  equation = req.body;
});
