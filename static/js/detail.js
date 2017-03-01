//This section of code is used to extract and show only the year from the release date
window.onload = function(){
  var dateToSplit = document.getElementById("releaseDate").innerHTML;
  var dateSplit = dateToSplit.split("-");
  document.getElementById("releaseDate").innerHTML = dateSplit[0];
}
