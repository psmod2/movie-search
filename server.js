var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var https = require('https');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//This refers to the static folder in which we keep CSS, images etc
app.use(express.static('static'))

//tmdb api key
const apiKey = "6e9626a35e71d15ad9e724cc8f77b3dd";

//Takes 2 parameters to as to give the URL called flexibility
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

//This is required for mocha tests to be able to use the method
exports.searchMovieAPI = searchMovieAPI;

//Entry route.
//Else block is used so as not to make an API call if there is nothing passed
app.get('/', function (req, res) {

   if ( typeof req.query.querym !== 'undefined' && req.query.querym ) {
     searchMovieAPI('search/movie', req.query.querym).then(function(returnedData){
       res.render('home', {moviesFound: returnedData.results});
     })
   } else {
     res.render('home');
   }

});

//Movie details page route.
//Else block is used so as not to make an API call if there is nothing passed
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
