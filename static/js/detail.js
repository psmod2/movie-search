window.onload = function(){
  var dateToSplit = document.getElementById("releaseDate").innerHTML;
  var dateSplit = dateToSplit.split("-");
  document.getElementById("releaseDate").innerHTML = dateSplit[0];
}
