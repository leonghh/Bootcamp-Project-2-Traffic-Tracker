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

    /* global moment */

    // blogContainer holds all of our posts
    var userContainer = $(".userinput");
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

    // InitializeRows handles appending all of our constructed post HTML inside blogContainer
    function initializeRows() {
        userContainer.empty();
        var usersToAdd = [];
        for (var i = 0; i < users.length; i++) {
            usersToAdd.push(createNewRow(users[i]));
        }
        userContainer.append(usersToAdd);
    }

    // This function constructs a post's HTML
    function createNewRow(user) {
        var formattedDate = new Date(user.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newUserCard = $("<div>");
        newUserCard.addClass("card");
        var newUserCardHeading = $("<div>");
        newUserCardHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-info");
        var newUserTitle = $("<h2>");
        var newUserDate = $("<small>");
        var newUser = $("<h5>");
        newUser.text("Written by: " + user.user);
        newUser.css({
            float: "right",
            color: "blue",
            "margin-top":
                "-10px"
        });
        var newUserCardBody = $("<div>");
        newUserCardBody.addClass("card-body");
        var newUserBody = $("<p>");
        newUserTitle.text(user.businessType + " ");
        newUserBody.text(user.lat);
        newUserDate.text(formattedDate);
        newUserTitle.append(newUserDate);
        newUserCardHeading.append(deleteBtn);
        newUserCardHeading.append(editBtn);
        newUserCardHeading.append(newUserTitle);
        newUserCardHeading.append(newUser);
        newUserCardBody.append(newUserBody);
        newUserCard.append(newUserCardHeading);
        newUserCard.append(newUserCardBody);
        newUserCard.data("user", user);
        return newUserCard;
    }

    // This function figures out which post we want to delete and then calls deletePost
    function handlePostDelete() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("user");
        deletePost(currentPost.id);
    }

    // This function figures out which post we want to edit and takes it to the appropriate url
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
        messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
            "'>here</a> in order to get started.");
        userContainer.append(messageH2);
    }
});