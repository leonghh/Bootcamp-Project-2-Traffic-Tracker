// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Grabbing our models
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/index.handlebars"));
  });

  app.get("/app", function (req, res) {
    res.sendFile(path.join(__dirname, "../views/map.handlebars"));
  });

};
