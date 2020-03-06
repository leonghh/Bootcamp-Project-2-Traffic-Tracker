var business = "";
var type ="";
var whatCompare ="";

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.865143, lng: 151.209900 },
        zoom: 15
    });

    google.maps.event.addListener(map, "click", function (event) {
        var newMark = new google.maps.Marker({
            position: event.latLng,
            map: map
        });
        newlat = event.latLng.lat();
        newlon = event.latLng.lng();
    });
}

$(document).ready(function () {

    $(document).on("click", ".compare", function() {
        var wat = $(this.id);
        console.log(wat);
        var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
        var mapOptions = {
        zoom: 17,
        center: myLatlng
        }
        var icon = {
            url: "https://i.ya-webdesign.com/images/coffee-cup-clipart-take-away-9.png", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            draggable: true,
            icon: icon,
            animation: google.maps.Animation.DROP
        });

        //this stuff just makes the marker bounce in a pretty way when we drop it
        marker.addListener('click', toggleBounce);
        
        function toggleBounce() {
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(google.maps.Animation.BOUNCE);
            }
          }

          // To add the marker to the map, call setMap();
        marker.setMap(map);
    })

    $(document).on("click", "#submit", displayLatLon)
    function displayLatLon(event) {
        business = $("#businessname").val().trim();
        type = $("#typeinput option:selected").val();
        var string = "Type of Business"
        if (type === string) {
            var errorField = $(".error");
            errorField.css("display", "block");
            return;
        }
        else {
            if (business !== "" && type !== string && newlat !== "" && newlon !== "") {
                var errorField = $(".error");
                errorField.css("display", "none");
                postUserData(business, type, newlat, newlon);
            } else {
                var errorField = $(".error");
                errorField.css("display", "block");
            }
     }
    }
    function postUserData(business, type, lat, lon) {
        // User route for saving a new user data
        $.ajax({
            url: '/api/user',
            type: 'POST',
            data: {
                user: business,
                businessType: type,
                lat: lat,
                lon: lon
            },
            success: function (data) {
            location.reload();
            }
        })
        
    };

    /* global moment */

    // blogContainer holds all of our posts
    var userContainer = $(".userinputtwo");
    // var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    // $(document).on("click", "button.delete", handleUserDelete);
    // $(document).on("click", "button.edit", handleUserEdit);
    // Variable to hold our posts
    var users;

    // The code below handles the case where we want to get blog posts for a specific author
    // Looks for a query param in the url for author_id
    var url = window.location.search;
    getUsers();

    // This function grabs posts from the database and updates the view
    function getUsers(user) {
        $.get("/api/user", function (data) {
            console.log("User", data);
            users = data;
            if (!users || !users.length) {
                displayEmpty();
            }
            else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete posts
    function deletePost(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/posts/" + id
        })
            .then(function () {
                getPosts(postCategorySelect.val());
            });
    }

    // InitializeRows handles appending all of our constructed User HTML inside blogContainer
    function initializeRows() {
        userContainer.empty();
        var usersToAdd = [];
        for (var i = 0; i < users.length; i++) {
            whatCompare = i;
            usersToAdd.push(createNewRow(users[i]));
        }
        userContainer.append(usersToAdd);
    }

    // This function constructs a post's HTML
    function createNewRow(user) {
        var formattedDate = new Date(user.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newUserCard = $("<div>");
        newUserCard.addClass("column");

        var outerdropdown = $("<div>");
        outerdropdown.addClass("dropdown is-hoverable is-right");
        var dropdownTrigger = $("<div>");
        dropdownTrigger.addClass("dropdown-trigger");
        var dropdownTriggerBtn = $("<button>");

        dropdownTriggerBtn.addClass("button");

        dropdownTriggerBtn.attr("aria-haspopup", "true");
        dropdownTriggerBtn.attr("aria-controls", "dropdown1");

        var dropdownMenu = $("<div>");
        dropdownMenu.addClass("dropdown-menu");
        dropdownMenu.attr("id", "dropdown1");
        dropdownMenu.attr("role", "menu");
        var dropdownContent = $("<div>");
        dropdownContent.addClass("dropdown-content");
        var dropdownItem = $("<div>");
        dropdownItem.addClass("dropdown-item");

        dropdownTriggerBtn.text(user.user + " " + user.businessType );

        var newType = $("<p>");
        newType.text(user.businessType + " ");
        newType.addClass("title is-4");
        var newUser = $("<p>");
        newUser.text("Written by: " + user.user);
        newUser.addClass("subtitle is-6");

        var newTime = $("<p>");
        newTime.text(formattedDate);

        var deleteBtn = $("<button>");
        deleteBtn.addClass("delete ui button");
        var editBtn = $("<button>");
        editBtn.attr("id", whatCompare)
        editBtn.text("Compare");
        editBtn.addClass("compare ui button");

        newType.append(deleteBtn);
        newUserCard.append(newType);
        newUserCard.append(newUser);
        newUserCard.append(newTime);
        newUserCard.append(editBtn);
        newUserCard.data("user", user);
        var whereTo = $("#whereto");

        dropdownItem.append(newUserCard);
        dropdownTrigger.append(dropdownTriggerBtn);
        dropdownContent.append(dropdownItem);
        dropdownMenu.append(dropdownContent);
        outerdropdown.append(dropdownTrigger);
        outerdropdown.append(dropdownMenu);

        return outerdropdown;
    }

    // This function figures out which User we want to delete and then calls deletePost
    function handlePostDelete() {
        var currentUser = $(this)
            .parent()
            .parent()
            .data("user");
        deletePost(currentPost.id);
    }

    // This function figures out which User we want to edit and takes it to the appropriate url
    function handlePostEdit() {
        var currentUser = $(this)
            .parent()
            .parent()
            .data("user");
        window.location.href = "/cms?user_id=" + currentUser.id;
    }

    // This function displays a message when there are no posts
    function displayEmpty() {
        var query = window.location.search;
        // var partial = "";
        // if (id) {
        //     partial = " for Author #" + id;
        // }
        userContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        // messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
        //     "'>here</a> in order to get started.");
        userContainer.append(messageH2);
    }
});