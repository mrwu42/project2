// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // load signup page
  app.get("/", function(req, res) {
    res.sendFile("signup.html", { root: path.join(__dirname, "../public") })

  });
  // load login page
  app.get("/login", function(req, res) {
    res.sendFile("login.html", { root: path.join(__dirname, "../public") })

  });

  // load members page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile("members.html", { root: path.join(__dirname, "../public") })

  });

  // load create page
  app.get("/create", function(req, res) {
    res.sendFile(path.join(_dirname, "../view/create.html"));
  });
};