var express = require("express");
var connection = require("../../../config/connection.js");

var router = express.Router();

function GetDrivingDistance(lat1, lat2, lon1, lon2) {
	var R = 6371; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
    var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    
    if (d>1) return Math.round(d);
	else if (d<=1) return Math.round(d);
	return d;
}

router.get("/", function(req, res) {
  res.render("index");
});

// router.get("/api/user", function(req, res) {
//   console.log(req.body);
//   var queryString = "SELECT * FROM trafficdata, user";
//     connection.query(queryString, function(err, result) {
//       result.forEach((element) => {
//           let dis = GetDrivingDistance(element.lat, element.wgs84_latitude, element.lon, element.wgs84_longitude);
//           if (dis <= 5) {console.log(element)}
//           else {return};
//       })
//     });
// })
module.exports = router;
