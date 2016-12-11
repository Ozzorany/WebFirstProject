let tempId = "";
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
        changeStatus("folowees-users", user._id, "unfollow");
        changeStatus("existing-users", user._id, "unfollow");
    }
}

let reloadingFollowings = function () {
    getAllFollowings(tempId)
        .then(function (response) {
            for (userId of response.data) {
                userFollowees.push({
                    _id: userId,
                    username: getNameById(userId, usersNames),
                    stage: "follow",
                    image: "images/useravatar.png"
                });
            }
        }).then(reloadExistingFollowees)
        .catch(function (error) {
            console.log(error);
        });
};

;
let reloadAllUsers = function () {
    getAllUsers()
        .then(function (response) {
            for (user of response.data) {
                if (user._id !== tempId) {
                    usersNames.push({
                        _id: user._id,
                        username: user.username,
                        stage: "follow",
                        image: "images/useravatar.png"
                    });
                }
            }
        }).then(reloadExistingUsers).then(reloadingFollowings)
        .catch(function (error) {
            console.log(error);
        });
};


window.onload = function () {
    getUser().then(function (res) {
        if (!res.data.userId != "") {
            window.location.href = "/SignIn.html";
        } else {
            tempId = res.data.userId;
            reloadAllUsers();
        }
    });

    var filterhSearch = $("#filter-user").elements[0];
    filterhSearch.addEventListener("input", function () {
        filterUsers();
    });

    let logout = $("#logout").elements[0];
    logout.addEventListener("click", function () {
        userLogOut();
    });
};


var UserSectionStructure = function (user, sectionSize) {

    var userSection = createDivElement();
    userSection.className = sectionSize;
    userSection.id = user._id;
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
    userName.appendChild(document.createTextNode(user.username));
    button.value = (user.stage)
    userImage.setAttribute("src", user.image);
    button.onclick = function () {
        if (button.value == "follow") {
            showFolowee(user);
            changeStatus("folowees-users", user._id, "unfollow");
            changeStatus("existing-users", user._id, "unfollow");
        } else {
            changeStatus("existing-users", user._id, "follow");
            removeFollowee(user._id);
        }

        followingUser(tempId, user._id);
    };

    return userSection;
};

var filterUsers = function () {
    var textToFilter = $("#filter-user").elements[0].value;
    for (user of usersNames) {
        if (!user.username.includes(textToFilter)) {
            $("#existing-users" + " #" + user._id).elements[0].style.display = "none";
        } else {
            $("#existing-users" + " #" + user._id).elements[0].style.display = "block";
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