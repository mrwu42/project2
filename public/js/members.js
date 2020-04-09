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
  $.get("/api/user_data").then(function(data) {
    console.log("User Info: " + JSON.stringify(data));
    // $(".member-name").text(data.username);
    // with the user-id, it will then gather the pet data to update the HTML on the page
    $.get("/api/pet_data/" + data.id).then(function(resp) {
      if (!resp) {
        // need to create a pet since one doesn't exist for this user!
        // first get the character data to populate defaults (using a default character for now)
        $.get("/api/character/1").then(function(charData) {
          // console.log("Character: " + JSON.stringify(charData));
          // value the new pet data with information from the character
          var petData = {
            hungerProgress: charData.hunger,
            playfulProgress: charData.play,
            sleepProgress: charData.sleep,
            cleanProgress: charData.dirty,
            medicationProgress: charData.health,
            wakeProgress: charData.love,
            UserId: data.id,
            CharacterId: charData.id
          };
          // create a new Pet for this user
          $.post("/api/pet", petData).then(function(newPet){
            console.log("Pet: " + JSON.stringify(newPet));
          });
        });
      } else {
        console.log("Existing Pet Info: " + JSON.stringify(resp));
        // $(".member-name").text(resp.User.username);
      };
    });
  });
});
