function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.865143, lng: 151.209900 },
        zoom: 15
    });

    google.maps.event.addListener(map, "click", function (event) {
        var newMark = new google.maps.Marker({
            position: event.latLng,
            map: map,
        });
        newlat = event.latLng.lat();
        newlon = event.latLng.lng();
    });
}

$(document).ready(function () {

    $(document).on("click", "#compare", displayLatLon)

    function displayLatLon(event) {
        event.preventDefault();
        console.log(newlat);
        console.log(newlon);
        postUserData(newlat, newlon);
    }
    function postUserData(lat, lon) {
        // POST route for saving a new user data
        $.ajax({
            url: '/api/user',
            type: 'POST',
            data: {
                user: 'Hong Hao',
                businessType: 'cafe',
                lat: lat,
                lon: lon
            },
            success: function (data) {
                alert("post success")
            }
        })
    };
});