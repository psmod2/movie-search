var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var https = require('https');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('static'))


const apiKey = "6e9626a35e71d15ad9e724cc8f77b3dd";


function searchMovieAPI(pathToSearch, dataToSearch){
  return new Promise(function(resolve, reject){
    https.get({
        host: 'api.themoviedb.org',
        path: '/3/'+pathToSearch+'?api_key='+apiKey+'&query='+encodeURI(dataToSearch),
    }, function(response) {
        response.on('data', function(data) {
          resolve(JSON.parse(data))
         });
    });

  });
}



app.get('/', function (req, res) {

   if ( typeof req.query.querym !== 'undefined' && req.query.querym ) {
     searchMovieAPI('search/movie', req.query.querym).then(function(returnedData){
       res.render('home', {moviesFound: returnedData.results});
     })
   } else {
     res.render('home');
   }

});

app.get('/detail', function (req, res) {

    if ( typeof req.query.id !== 'undefined' && req.query.id ) {
      searchMovieAPI('movie/'+req.query.id).then(function(returnedData){
        res.render('detail', returnedData);
      })
    } else {
      res.render('detail');
    }

});

var port_number = process.env.PORT || 3000;

app.listen(port_number, function () {
  console.log('Movie Search Site on Port: ' + port_number);
});
