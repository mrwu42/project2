// sample for the makeprogress bar
function makeProgress(attr, endpoint, i) {
  var bar;
  if (i < endpoint) {
    i = i + 1;
    attr.css("width", i + "%").text(i + " %");
    bar = setTimeout(makeProgress(attr, endpoint, i), 1000);
  }
  // Wait for sometime before running this script again
  // setTimeout("makeProgress()", 100);
  clearTimeout(bar);
}

$(document).ready(function() {
  var dirty = $("#dirty");
  var health = $("#health");
  var hunger = $("#hunger");
  var love = $("#love");
  var play = $("#play");
  var sleep = $("#sleep");

  // makeProgress();

  // This does a GET request to figure out which user is logged in
  $.get("/api/user_data").then(function(data) {
    console.log("User Info: " + JSON.stringify(data));
    $(".member-name").text("Welcome " + data.username);
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
          $.post("/api/pet", petData).then(function(newPet) {
            console.log("Pet: " + JSON.stringify(newPet));
            makeProgress(hunger, newPet.hungerProgress, 0);
            makeProgress(play, newPet.playfulProgress, 0);
            makeProgress(sleep, newPet.sleepProgress, 0);
            makeProgress(love, newPet.wakeProgress, 0);
            makeProgress(dirty, newPet.cleanProgress, 0);
            makeProgress(health, newPet.medicationProgress, 0);
          });
        });
      } else {
        console.log("Existing Pet Info: " + JSON.stringify(resp));
        // $(".member-name").text(resp.User.username);
        makeProgress(hunger, resp.hungerProgress, 0);
        makeProgress(play, resp.playfulProgress, 0);
        makeProgress(sleep, resp.sleepProgress, 0);
        makeProgress(love, resp.wakeProgress, 0);
        makeProgress(dirty, resp.cleanProgress, 0);
        makeProgress(health, resp.medicationProgress, 0);
      }
    });
  });

  $("#feedButton").on("click", feedButton);

  $("#playButton").on("click", playButton);

  $("#sleepButton").on("click", sleepButton);

  $("#loveButton").on("click", loveButton);

  $("#cleanButton").on("click", cleanButton);

  $("#medicineButton").on("click", medicineButton);
});
