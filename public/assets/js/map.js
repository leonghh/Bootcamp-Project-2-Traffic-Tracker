// $(document).ready(function() {

// var lat="";
// var long="";

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -33.865143, lng: 151.209900},
//     zoom: 15
//   });

//   google.maps.event.addListener(map, "click", function (event) {
//     var newMark = new google.maps.Marker({
//       position: event.latLng,
//       map: map,
//     });
//     newlat = event.latLng.lat();
//     newlong = event.latLng.lng();
//   });
// }

// let button = $('#compare');
// button.on("click", function(){
//     $.ajax({
//               type: "GET",
//             url: "http://localhost:8080/api/searchrequest",
//             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//             contentType: 'application/x-www-form-urlencoded; charset=utf-8',
//             data: {lat: -33.865143, long: 151.209900},
//             success: function(response){
//                 console.log(response);
//             }
//         })
//   });
// });
  