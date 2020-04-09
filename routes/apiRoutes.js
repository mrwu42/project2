var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function(req, res) {
    db.User.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the username and id
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });

  // Route for getting the current pet data to be used client side
  app.get("/api/pet_data/:id", function(req, res) {
    db.Pet.findOne({
      where: {
        UserId: req.params.id
      },
      include: [db.Character, db.User]
    }).then(function(dbPet) {
      res.json(dbPet);
    });
  });

  // Route for getting the current pet data to be used client side
  app.get("/api/character/:id", function(req, res) {
    db.Character.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbCharacter) {
      res.json(dbCharacter);
    });
  });

  app.post("/api/pet", function(req, res) {
    db.Pet.create(req.body).then(function(dbPet) {
      res.json(dbPet);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};
