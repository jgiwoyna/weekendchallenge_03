var express = require('express');
var router = express.Router();
var equation = {};

router.post('/multiply', function(req, res){
  equation = req.body;
});
