const configVars = {
  apikey : "6e9626a35e71d15ad9e724cc8f77b3dd"
}

const tmdbAPI_Search = "https://api.themoviedb.org/3/search/movie?";

goSearch = function() {
  var titleToSearch = document.getElementById("movieSearchField").value;

  $.getJSON( tmdbAPI_Search, {
    api_key: configVars.apikey,
    query: titleToSearch
  })
    .done(function( data ) {
      $( "#resultsBlock" ).empty();

      $.each( data.results, function( i, item ) {
        var imageToDisplay = "http://image.tmdb.org/t/p/w300//"+item.poster_path;
        if (item.poster_path == null) {imageToDisplay = "/images/missingPoster.png"}
        $("<span class=\"resultsItems\"><a href=\"detail?mid="+item.id+"\"><img src=\""+imageToDisplay+"\"/></a></span>")
            .appendTo( "#resultsBlock" );
      });
    });
}
