// update the makeprogress bar
function makeProgress(attr, endpoint, i) {
  var bar;
  if (i < endpoint) {
    i = i + 1;
    attr.css("width", i + "%").text(i + " %");
    bar = setTimeout(makeProgress(attr, endpoint, i), 1000);
  }
  clearTimeout(bar);
}
// if the parameter passed in has a value, simply return that same value
// if the parameter is NULL or not valued, calculate and format a DateTime to use
// from Stack Overflow https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
function setDTStamp(DateTime) {
  if (!DateTime) {
    var date;
    date = new Date();
    return (
      date.getUTCFullYear() +
      "-" +
      twoDigits(1 + date.getUTCMonth()) +
      "-" +
      twoDigits(date.getUTCDate()) +
      " " +
      twoDigits(date.getUTCHours()) +
      ":" +
      twoDigits(date.getUTCMinutes()) +
      ":" +
      twoDigits(date.getUTCSeconds())
    );
  } else {
    return DateTime;
  }
}
// make each part of the DateTime stamp two digits
// from Stack Overflow https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
function twoDigits(d) {
  if (0 <= d && d < 10) {
    return "0" + d.toString();
  }
  if (-10 < d && d < 0) {
    return "-0" + (-1 * d).toString();
  }
  return d.toString();
}
// when a particular progress bar goes above 80, that status is set to true
function checkStatus(bar) {
  return bar >= 80;
}
// when the health progress bar goes below 25, that status is set to true
function checkHealth(bar) {
  return bar <= 25;
}
// when the document has been loaded.
$(document).ready(function() {
  var dirty = $("#dirty");
  var health = $("#health");
  var hunger = $("#hunger");
  var love = $("#love");
  var play = $("#play");
  var sleep = $("#sleep");
  var petId;
  // This does a GET request to figure out which user is logged in
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text("Welcome " + data.username);
    // with the user-id, it will then gather the pet data to update the HTML on the page
    $.get("/api/pet_data/" + data.id).then(function(resp) {
      if (!resp) {
        // need to create a pet since one doesn't exist for this user!
        // first get the character data to populate defaults (using a default character for now)
        $.get("/api/character/1").then(function(charData) {
          // value the new pet data with information from the character
          var petData = {
            hungerProgress: charData.hunger,
            playfulProgress: charData.play,
            sleepProgress: charData.sleep,
            cleanProgress: charData.dirty,
            medicationProgress: charData.health,
            loveProgress: charData.love,
            UserId: data.id,
            CharacterId: charData.id
          };
          // create a new Pet for this user
          $.post("/api/pet", petData).then(function(newPet) {
            makeProgress(hunger, newPet.hungerProgress, 0);
            makeProgress(play, newPet.playfulProgress, 0);
            makeProgress(sleep, newPet.sleepProgress, 0);
            makeProgress(love, newPet.loveProgress, 0);
            makeProgress(dirty, newPet.cleanProgress, 0);
            makeProgress(health, newPet.medicationProgress, 0);
            petId = newPet.id;
            showImage(newPet);
          });
        });
      } else {
        // console.log("Pet Info: " + JSON.stringify(resp));
        makeProgress(hunger, resp.hungerProgress, 0);
        makeProgress(play, resp.playfulProgress, 0);
        makeProgress(sleep, resp.sleepProgress, 0);
        makeProgress(love, resp.loveProgress, 0);
        makeProgress(dirty, resp.cleanProgress, 0);
        makeProgress(health, resp.medicationProgress, 0);
        petId = resp.id;
        showImage(resp);
      }
    });
  });
  // Feed Button clicked
  $("body").on("click", "#feedButton", function() {
    feedButton(petId);
  });
  // Play Button clicked
  $("body").on("click", "#playButton", function() {
    playButton(petId);
  });
  // Sleep Button clicked
  $("body").on("click", "#sleepButton", function() {
    sleepButton(petId);
  });
  // love Button clicked
  $("body").on("click", "#loveButton", function() {
    loveButton(petId);
  });
  // clean Button clicked
  $("body").on("click", "#cleanButton", function() {
    cleanButton(petId);
  });
  // Medicine Button clicked
  $("body").on("click", "#medicineButton", function() {
    medicineButton(petId);
  });
  // display the correct image to the egg!
  function showImage(pet) {
    switch (true) {
    case pet.isHungry:
      // isHungryImg
      console.log("Display Hungry Image");
      break;
    case pet.isPlayful:
      // isPlayfulImg
      console.log("Display Playful Image");
      break;
    case pet.isSleepy:
      // isSleepyImg
      console.log("Display Sleepy Image");
      break;
    case pet.isLoved:
      // isLovedImg
      console.log("Display Loved Image");
      break;
    case pet.isClean:
      // isDirtyImg
      console.log("Display Dirty Image");
      break;
    case pet.isMedicated:
      console.log("Display Sick Image");
      break;
    default:
      console.log("Display Default Image");
    }
  }
});
// execute the specifics of the feed button being clicked
function feedButton(petId) {
  // gather the current pet row from the DB
  $.get("/api/pet/" + petId).then(function(resp) {
    // establish variables for progress bars to be changed
    var hungerBar = resp.hungerProgress;
    var sleepyBar = resp.sleepProgress;
    var loveBar = resp.loveProgress;
    var healthBar = resp.medicationProgress;
    // if hunger is below 30 but still tried to feed, the health and love are reduced
    if (hungerBar < 30) {
      healthBar =
        (healthBar -= Math.floor(Math.random() * 5) + 5) < 0 ? 0 : healthBar;
      loveBar = (loveBar -= 2) < 0 ? 0 : loveBar;
    }
    // feeding happend at an OK time, increase the love
    else {
      loveBar = (loveBar += 1) > 100 ? 100 : loveBar;
    }
    // reduce the hunger
    hungerBar =
      (hungerBar -= Math.floor(Math.random() * 5) + 5) < 0 ? 0 : hungerBar;
    // increase the sleepiness
    sleepyBar =
      (sleepyBar += Math.floor(Math.random() * 5) + 5) > 100 ? 100 : sleepyBar;
    // gather all the pet column values to pass to the update routine
    var petUpdate = {
      isHungry: checkStatus(hungerBar),
      hungerProgress: hungerBar,
      // since this update is for the Feed Button, this will set the DT to the current DT.
      lastFedDT: setDTStamp(),
      isPlayful: checkStatus(resp.playfulProgress),
      playfulProgress: resp.playfulProgress,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastPlayDT: setDTStamp(resp.lastPlayDT),
      isSleepy: checkStatus(sleepyBar),
      sleepProgress: sleepyBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastSleepDT: setDTStamp(resp.lastSleepDT),
      isLoved: checkStatus(loveBar),
      loveProgress: loveBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastLovedDT: setDTStamp(resp.lastLovedDT),
      isClean: checkStatus(resp.cleanProgress),
      cleanProgress: resp.cleanProgress,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastCleanDT: setDTStamp(resp.lastCleanDT),
      isMedicated: checkHealth(healthBar),
      medicationProgress: healthBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastMedicineDT: setDTStamp(resp.lastMedicineDT)
    };
    // call the API route to update the pet row with the provided information
    $.ajax({
      method: "PUT",
      url: "/api/pet/" + petId,
      data: petUpdate
    }).then(function() {
      // return to the page so the new values can be loaded and reflected
      window.location.href = "/members";
    });
  });
}
// execute the specifics of the play button being clicked
function playButton(petId) {
  // gather the current pet row from the DB
  $.get("/api/pet/" + petId).then(function(resp) {
    // establish variables for progress bars to be changed
    var playBar = resp.playfulProgress;
    var hungerBar = resp.hungerProgress;
    var sleepyBar = resp.sleepProgress;
    var cleanBar = resp.cleanProgress;
    var loveBar = resp.loveProgress;
    var healthBar = resp.medicationProgress;
    // if playfulness is below 30 but still tried to play, the health and love are reduced
    if (playBar < 30) {
      healthBar =
        (healthBar -= Math.floor(Math.random() * 5) + 5) < 0 ? 0 : healthBar;
      loveBar = (loveBar -= 2) < 0 ? 0 : loveBar;
    }
    // playing happend at an OK time, increase the love
    else {
      loveBar = (loveBar += 1) > 100 ? 100 : loveBar;
    }
    // reduce the playfulness
    playBar = (playBar -= Math.floor(Math.random() * 5) + 5) < 0 ? 0 : playBar;
    // increase the hunger
    hungerBar =
      (hungerBar += Math.floor(Math.random() * 5) + 5) < 0 ? 0 : hungerBar;
    // increase the sleepiness
    sleepyBar =
      (sleepyBar += Math.floor(Math.random() * 5) + 5) > 100 ? 100 : sleepyBar;
    // increase the dirtyness
    cleanBar =
      (cleanBar += Math.floor(Math.random() * 10) + 10) > 100 ? 100 : cleanBar;
    // gather all the pet column values to pass to the update routine
    var petUpdate = {
      isHungry: checkStatus(hungerBar),
      hungerProgress: hungerBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastFedDT: setDTStamp(resp.lastFedDT),
      isPlayful: checkStatus(playBar),
      playfulProgress: playBar,
      // since this update is for the Play Button, this will set the DT to the current DT.
      lastPlayDT: setDTStamp(),
      isSleepy: checkStatus(sleepyBar),
      sleepProgress: sleepyBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastSleepDT: setDTStamp(resp.lastSleepDT),
      isLoved: checkStatus(loveBar),
      loveProgress: loveBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastLovedDT: setDTStamp(resp.lastLovedDT),
      isClean: checkStatus(cleanBar),
      cleanProgress: cleanBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastCleanDT: setDTStamp(resp.lastCleanDT),
      isMedicated: checkHealth(healthBar),
      medicationProgress: healthBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastMedicineDT: setDTStamp(resp.lastMedicineDT)
    };
    // call the API route to update the pet row with the provided information
    $.ajax({
      method: "PUT",
      url: "/api/pet/" + petId,
      data: petUpdate
    }).then(function() {
      // return to the page so the new values can be loaded and reflected
      window.location.href = "/members";
    });
  });
}
// execute the specifics of the sleep button being clicked
function sleepButton(petId) {
  // gather the current pet row from the DB
  $.get("/api/pet/" + petId).then(function(resp) {
    // establish variables for progress bars to be changed
    var sleepyBar = resp.sleepProgress;
    var playBar = resp.playfulProgress;
    var hungerBar = resp.hungerProgress;
    var loveBar = resp.loveProgress;
    var healthBar = resp.medicationProgress;
    // if sleepiness is below 30 but still tried to sleep, the health and love are reduced
    if (sleepyBar < 30) {
      healthBar =
        (healthBar -= Math.floor(Math.random() * 5) + 5) < 0 ? 0 : healthBar;
      loveBar = (loveBar -= 2) < 0 ? 0 : loveBar;
    }
    // playing happend at an OK time, increase the love
    else {
      loveBar = (loveBar += 1) > 100 ? 100 : loveBar;
    }
    // reduce the sleepiness
    sleepyBar =
      (sleepyBar -= Math.floor(Math.random() * 5) + 5) < 0 ? 0 : sleepyBar;
    // increase the playfulness
    playBar =
      (playBar += Math.floor(Math.random() * 10) + 10) > 100 ? 100 : playBar;
    // increase the hunger
    hungerBar =
      (hungerBar += Math.floor(Math.random() * 5) + 5) < 0 ? 0 : hungerBar;
    // gather all the pet column values to pass to the update routine
    var petUpdate = {
      isHungry: checkStatus(hungerBar),
      hungerProgress: hungerBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastFedDT: setDTStamp(resp.lastFedDT),
      isPlayful: checkStatus(playBar),
      playfulProgress: resp.playfulProgress,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastPlayDT: setDTStamp(resp.lastPlayDT),
      isSleepy: checkStatus(sleepyBar),
      sleepProgress: sleepyBar,
      // since this update is for the Sleep Button, this will set the DT to the current DT.
      lastSleepDT: setDTStamp(),
      isLoved: checkStatus(loveBar),
      loveProgress: loveBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastLovedDT: setDTStamp(resp.lastLovedDT),
      isClean: checkStatus(resp.cleanProgress),
      cleanProgress: resp.cleanProgress,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastCleanDT: setDTStamp(resp.lastCleanDT),
      isMedicated: checkHealth(healthBar),
      medicationProgress: healthBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastMedicineDT: setDTStamp(resp.lastMedicineDT)
    };
    // call the API route to update the pet row with the provided information
    $.ajax({
      method: "PUT",
      url: "/api/pet/" + petId,
      data: petUpdate
    }).then(function() {
      // return to the page so the new values can be loaded and reflected
      window.location.href = "/members";
    });
  });
}
// execute the specifics of the clean button being clicked
function cleanButton(petId) {
  // gather the current pet row from the DB
  $.get("/api/pet/" + petId).then(function(resp) {
    // establish variables for progress bars to be changed
    var cleanBar = resp.cleanProgress;
    var loveBar = resp.loveProgress;
    var healthBar = resp.medicationProgress;
    // if dirtyness bar is below 30 but still tried to clean, the love and health are reduced
    if (cleanBar < 30) {
      loveBar = (loveBar -= 2) < 0 ? 0 : loveBar;
    }
    // playing happend at an OK time, increase the love
    else {
      loveBar = (loveBar += 1) > 100 ? 100 : loveBar;
    }
    // reduce the health
    if (cleanBar > 80) {
      healthBar =
        (healthBar -= Math.floor(Math.random() * 5) + 5) < 0 ? 0 : healthBar;
    }
    // reduce the dirtyness
    cleanBar =
      (cleanBar -= Math.floor(Math.random() * 5) + 5) < 0 ? 0 : cleanBar;
    // gather all the pet column values to pass to the update routine
    var petUpdate = {
      isHungry: checkStatus(resp.hungerProgress),
      hungerProgress: resp.hungerProgress,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastFedDT: setDTStamp(resp.lastFedDT),
      isPlayful: checkStatus(resp.playfulProgress),
      playfulProgress: resp.playfulProgress,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastPlayDT: setDTStamp(resp.lastPlayDT),
      isSleepy: checkStatus(resp.sleepProgress),
      sleepProgress: resp.sleepProgress,
      // since this update is for the Sleep Button, this will set the DT to the current DT.
      lastSleepDT: setDTStamp(resp.lastSleepDT),
      isLoved: checkStatus(loveBar),
      loveProgress: loveBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastLovedDT: setDTStamp(resp.lastLovedDT),
      isClean: checkStatus(cleanBar),
      cleanProgress: cleanBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastCleanDT: setDTStamp(),
      isMedicated: checkHealth(healthBar),
      medicationProgress: healthBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastMedicineDT: setDTStamp(resp.lastMedicineDT)
    };
    // call the API route to update the pet row with the provided information
    $.ajax({
      method: "PUT",
      url: "/api/pet/" + petId,
      data: petUpdate
    }).then(function() {
      // return to the page so the new values can be loaded and reflected
      window.location.href = "/members";
    });
  });
}

// execute the specifics of the sleep button being clicked
function medicineButton(petId) {
  // gather the current pet row from the DB
  $.get("/api/pet/" + petId).then(function(resp) {
    // establish variables for progress bars to be changed
    var healthBar = resp.medicationProgress;
    var loveBar = resp.loveProgress;
    // increase health
    healthBar =
      (healthBar += Math.floor(Math.random() * 5) + 5) < 0 ? 0 : healthBar;
    // increase love
    loveBar = (loveBar += 1) > 100 ? 100 : loveBar;

    // gather all the pet column values to pass to the update routine
    var petUpdate = {
      isHungry: checkStatus(resp.hungerProgress),
      hungerProgress: resp.hungerProgress,
      // since this update is for the Feed Button, this will set the DT to the current DT.
      lastFedDT: setDTStamp(resp.lastFedDT),
      isPlayful: checkStatus(resp.playfulProgress),
      playfulProgress: resp.playfulProgress,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastPlayDT: setDTStamp(resp.lastPlayDT),
      isSleepy: checkStatus(resp.sleepProgress),
      sleepProgress: resp.sleepProgress,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastSleepDT: setDTStamp(resp.lastSleepDT),
      isLoved: checkStatus(loveBar),
      loveProgress: loveBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastLovedDT: setDTStamp(resp.lastLovedDT),
      isClean: checkStatus(resp.cleanProgress),
      cleanProgress: resp.cleanProgress,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastCleanDT: setDTStamp(resp.lastCleanDT),
      isMedicated: checkHealth(healthBar),
      medicationProgress: healthBar,
      // execute the DT function in case the value was null - we need a DT to do an update.
      lastMedicineDT: setDTStamp()
    };
    // call the API route to update the pet row with the provided information
    $.ajax({
      method: "PUT",
      url: "/api/pet/" + petId,
      data: petUpdate
    }).then(function() {
      // return to the page so the new values can be loaded and reflected
      window.location.href = "/members";
    });
  });
}
