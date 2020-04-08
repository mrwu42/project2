// sample for the makeprogress bar
var i = 0;

function makeProgress() {
  if (i < 100) {
    i = i + 1;
    $("#hunger")
      .css("width", i + "%")
      .text(i + " %");
  }
  // Wait for sometime before running this script again
  setTimeout("makeProgress()", 100);
}

$(document).ready(function() {
  makeProgress();

  // This does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.username);
  });
});
