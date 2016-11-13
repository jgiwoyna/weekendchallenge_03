var express = require('express');
var router = express.Router();
var equation = {};

router.post('/divide', function(req, res){
  equation = req.body;
});
