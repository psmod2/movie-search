var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('static'))

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/search', function (req, res) {
    res.render('search');
});

var port_number = process.env.PORT || 3000;

app.listen(port_number, function () {
  console.log('Movie Search Site on Port: ' + port_number);
});
