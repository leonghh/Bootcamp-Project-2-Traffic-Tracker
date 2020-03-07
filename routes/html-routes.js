var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
// var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {  
    res.render("index");
});

router.get("/app", function (req, res) {  
  res.render("map");
});

// Export routes for server.js to use.
module.exports = router;

// Grabbing our models
// var path = require("path");

// Routes
// =============================================================
// module.exports = function (app) {

//   app.get("/", function(req, res) {
//     res.render("index");
//   });
  
//   app.get("/app", function(req, res) {
//     res.render("map");
//   });

// };