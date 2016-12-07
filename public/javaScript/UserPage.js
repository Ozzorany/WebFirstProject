const tempUser = "10c06b27-d8ee-4435-9cee-0a2a838ca14a";
var usersNames = [];
var userFollowees = [];

var reloadExistingUsers = function () {
    var existingUsersSection = $("#existing-users").elements[0];
    for (user of usersNames) {
        existingUsersSection.appendChild(UserSectionStructure(user, "col-md-2"));
    }
};

var reloadExistingFollowees = function () {
    var existingUsersSection = $("#folowees-users").elements[0];
    for (user of userFollowees) {
        existingUsersSection.appendChild(UserSectionStructure(user, "col-md-12"));
        changeStatus("folowees-users", user.id, "unfollow");
        changeStatus("existing-users", user.id, "unfollow");
    }
}

getAllUsers()
    .then(function (response) {
        for (user of response.data) {
            if (user._id !== tempUser) {
                usersNames.push({id: user._id, name: user.username, stage: "follow", image: "images/useravatar.png"});
            }
        }
    }).then(reloadExistingUsers)
    .catch(function (error) {
        console.log(error);
    });

getAllFollowings(tempUser)
    .then(function (response) {
        for (username of usersNames) {
            for (userId of response.data) {
                if (userId === username.id) {
                    userFollowees.push({
                        id: userId,
                        name: username.name,
                        stage: "follow",
                        image: "images/useravatar.png"
                    });
                }
            }
        }
    }).then(reloadExistingFollowees)
    .catch(function (error) {
        console.log(error);
    });

window.onload = function () {
    var filterhSearch = $("#filter-user").elements[0];
    filterhSearch.addEventListener("input", function () {
        filterUsers();
    });
};


var UserSectionStructure = function (user, sectionSize) {

    var userSection = createDivElement();
    userSection.className = sectionSize;
    userSection.id = user.id;
    var thumbnail = createDivElement();
    thumbnail.className = "thumbnail";
    var generalUser = createDivElement();
    generalUser.className = "generalUser";
    var userImage = createImageElement();
    userImage.className = "userImage";
    var userFollow = createDivElement();
    userFollow.className = "userFollow";
    var button = createInputlement();
    button.className = "btn btn-primary follow";
    button.type = "button";
    var userName = createDivElement();
    userName.className = "userName";

    userSection.appendChild(thumbnail);
    thumbnail.appendChild(generalUser);
    generalUser.appendChild(userImage);
    generalUser.appendChild(userFollow);
    generalUser.appendChild(userName);
    userFollow.appendChild(button);
    userName.appendChild(document.createTextNode(user.name));
    button.value = (user.stage);
    userImage.setAttribute("src", user.image);
    button.onclick = function () {
        if (button.value == "follow") {
            showFolowee(user);
            changeStatus("folowees-users", user.id, "unfollow");
            changeStatus("existing-users", user.id, "unfollow");
        } else {
            changeStatus("existing-users", user.id, "follow");
            removeFollowee(user.id);
        }
    };

    return userSection;
};

var filterUsers = function () {
    var textToFilter = $("#filter-user").elements[0].value;
    for (user of usersNames) {
        if (!user.name.includes(textToFilter)) {
            $("#existing-users" + " #" + user.id).elements[0].style.display = "none";
        } else {
            $("#existing-users" + " #" + user.id).elements[0].style.display = "block";
        }
    }
}

var changeStatus = function (sectionToChange, userId, status) {
    $("#" + sectionToChange + " #" + userId).elements[0].getElementsByClassName("follow")[0].value = status;
}

var removeFollowee = function (userId) {
    $('#folowees-users #' + userId).elements[0].remove();
}

var showFolowee = function (user) {
    user.stage = "unfollow";
    var FoloweeSection = $("#folowees-users").elements[0];
    FoloweeSection.appendChild(UserSectionStructure(user, "col-md-12"));
}