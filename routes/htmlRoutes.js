var db = require("../models");


module.exports = function(app) {
  // load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(_dirname, "../view/index.html"));
  });
  // load create page
  app.get("/create", function(req, res) {
    res.sendFile(path.join(_dirname, "../view/create.html"));
  });
  // load sign in page 
  app.get("/login", function(req, res) {
    res.sendFile(path.join(_dirname, "../view/login.html"));
  });
};

// module.exports = function(app) {
//   // Load index page
//   app.get("/", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.render("index", {
//         msg: "Welcome!",
//         examples: dbExamples
//       });
//     });
//   });

//   // Load example page and pass in an example by id
//   app.get("/example/:id", function(req, res) {
//     db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.render("example", {
//         example: dbExample
//       });
//     });
//   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
// };