var express = require("express");
var app = express();
var index = require('./routes/index');
var bodyParser = require('body-parser');
var calc = require('./modules/calc');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 8000);


app.get('/', index);

app.use('/math', calc);

app.use(express.static('public'));

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});
