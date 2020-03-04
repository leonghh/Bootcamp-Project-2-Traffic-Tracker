// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Grabbing our models

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
  });

  // POST route for saving a new todo. You can create a todo using the data on req.body
  app.post("/api/user", function(req, res) {
    db.User.create(req.body)

      .then(function() {
        console.log("works")
      })
      .catch(function(err) {
        res.status(401).json(err)
      })

  });

  // app.get("/api/user", function(req, res) {
  //   console.log(req.body);
  //   var queryString = "SELECT * FROM trafficdata, user";
  //     connection.query(queryString, function(err, result) {
  //       result.forEach((element) => {
  //           let dis = GetDrivingDistance(element.lat, element.wgs84_latitude, element.lon, element.wgs84_longitude);
  //           if (dis <= 5) {console.log(element)}
  //           else {return};
  //           res.json(result);
  //       })
  //     });
  // })

};
