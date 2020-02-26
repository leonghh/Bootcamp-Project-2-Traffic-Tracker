function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -33.865143, lng: 151.209900},
      zoom: 15
  });

  google.maps.event.addListener(map, 'click', function (event) {
      var newMark = new google.maps.Marker({
          position: event.latLng,
          map: map,
      });

      console.log(event.latLng.lat());
      console.log(event.latLng.lng());

  });
}
